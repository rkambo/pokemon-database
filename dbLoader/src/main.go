/*
TODO: Poll to see if PokeAPI has been updated (Check generation endpoint)

	: If yes, update DB
*/
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

type Ref struct {
	LastLoadedGen    float64
	LastModifiedDate string
}

func main() {

	// Set up flags for logging
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	logFile, err := os.OpenFile("../log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)

	if err != nil {
		log.Fatal(err)
	}
	log.SetOutput(logFile)

	// Read the ref.json
	file, err := os.ReadFile("../ref.json")
	if err != nil {
		log.Fatalln(err)
	}

	out := Ref{}
	err = json.Unmarshal([]byte(file), &out)
	if err != nil {
		log.Fatalln(err)
	}

	// Poll the endpoint
	resp, err := http.Get("https://pokeapi.co/api/v2/generation")
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
		fmt.Println("Exiting.")
		// End the program
		return
	}

	loadDB()

	record := Ref{genCount, time.Now().Format("2006-01-02 15:04:05")}

	recordJson, err := json.MarshalIndent(record, "", "\t")
	if err != nil {
		log.Fatalln(err)
	}

	err = os.WriteFile("../ref.json", recordJson, 0644)
	if err != nil {
		log.Fatalln(err)
	}
}
