/**********************************************************
*
* Description:
*
* This file is the main entrypoint into the program.
* This go module will check the Pokemon endpoint to see if
* new Pokemon will need to be added. If so, it will grab a
* batch of required URLs, retrieve info from the URLs, and
* populate the associated Database collection.
*
**********************************************************/
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Ref struct {
	LastLoadedGen    float64
	LastModifiedDate string
}

func main() {

	// Load .env file
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalln("Error loading .env file", err)
	}

	// Set up flags for logging
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	logFile, err := os.OpenFile(os.Getenv("LOG_FILEPATH"), os.O_APPEND|os.O_WRONLY, 0666)

	if err != nil {
		log.Fatalln(err)
	}
	log.SetOutput(logFile)

	// Read the ref.json
	file, err := os.ReadFile(os.Getenv("REF_FILEPATH"))
	if err != nil {
		log.Fatalln(err)
	}

	out := Ref{}
	err = json.Unmarshal([]byte(file), &out)
	if err != nil {
		log.Fatalln(err)
	}

	// Poll the endpoint
	resp, err := http.Get(os.Getenv("POKEAPI_GENERATION"))
	if err != nil {
		log.Fatalln(err)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	res := string(body)

	var result map[string]interface{}

	json.Unmarshal([]byte(res), &result)

	genCount := result["count"].(float64)

	if out.LastLoadedGen >= genCount {
		fmt.Println("Latest pokemon info retrieved!")
		fmt.Println("Exiting...")

		return
	}

	loadDB()

	record := Ref{genCount, time.Now().Format("2006-01-02 15:04:05")}

	recordJson, err := json.MarshalIndent(record, "", "\t")
	if err != nil {
		log.Fatalln(err)
	}

	err = os.WriteFile(os.Getenv("REF_FILEPATH"), recordJson, 0644)
	if err != nil {
		log.Fatalln(err)
	}
}
