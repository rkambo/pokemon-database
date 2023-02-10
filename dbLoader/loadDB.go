package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type Pokemon struct {
}

func apiCallout(endpoint string, c chan string) (response string) {
	resp, err := http.Get(endpoint)
	if err != nil {
		log.Fatalf(err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	if c != nil {
		c <- string(body)
		return ""
	}

	return string(body)
}

func getUrlBatches() (retBatchOne []string, retBatchTwo []string) {
	batchOne := apiCallout("https://pokeapi.co/api/v2/pokemon?limit=2", nil)
	batchTwo := apiCallout("https://pokeapi.co/api/v2/pokemon-species?limit=2", nil)

	var batchOneResponseMap map[string]any
	json.Unmarshal([]byte(batchOne), &batchOneResponseMap)

	var batchTwoResponseMap map[string]any
	json.Unmarshal([]byte(batchTwo), &batchTwoResponseMap)

	var batchOneUrls []string
	var batchTwoUrls []string

	for _, url := range batchOneResponseMap["results"].([]interface{}) {
		name := (url.(map[string]interface{})["url"]).(string)
		batchOneUrls = append(batchOneUrls, name)
	}

	for _, url := range batchTwoResponseMap["results"].([]interface{}) {
		name := (url.(map[string]interface{})["url"]).(string)
		batchTwoUrls = append(batchTwoUrls, name)
	}

	return batchOneUrls, batchTwoUrls
}

func bulkInfoRetrieve(batchOne []string, batchTwo []string) {
	batchOneChannel := make(chan string)
	batchTwoChannel := make(chan string)

	for _, v := range batchOne {
		go apiCalloutGo(v, batchOneChannel)
	}

	for _, v := range batchTwo {
		go apiCalloutGo(v, batchTwoChannel)
	}
}

func main() {
	//endpoint := "https://pokeapi.co/api/v2/pokemon?limit=100000"
	//endpoint2 := "https://pokeapi.co/api/v2/pokemon-species?limit=100000"
	batchOne, batchTwo := getUrlBatches()
	bulkInfoRetrieve(batchOne, batchTwo)

}
