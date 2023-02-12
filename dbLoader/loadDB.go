package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"sync"
)

type Pokemon struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Image  string
	Genera []struct {
		Category string `json:"genus"`
	}
}

func setImagePath(pokemon *Pokemon) {
	pokemon.Image = fmt.Sprintf("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/%d.svg", pokemon.Id)
}

func apiCallout(endpoint string) (response string) {
	resp, err := http.Get(endpoint)
	if err != nil {
		log.Fatalf(err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	return string(body)
}

func getUrlBatches() []string {
	batch := apiCallout("https://pokeapi.co/api/v2/pokemon-species?limit=100000")

	var batchTwoResponseMap map[string]any
	json.Unmarshal([]byte(batch), &batchTwoResponseMap)

	var batchUrls []string

	for _, url := range batchTwoResponseMap["results"].([]interface{}) {
		name := (url.(map[string]interface{})["url"]).(string)
		batchUrls = append(batchUrls, name)
	}

	return batchUrls
}

func bulkInfoRetrieve(batch []string) {

	var wg sync.WaitGroup

	for _, v := range batch {
		wg.Add(1)
		go wrapApiCallout(&wg, v)
	}

	wg.Wait()
}

func wrapApiCallout(wg *sync.WaitGroup, endpoint string) {
	pokemonMap := make(map[string](Pokemon))
	response := apiCallout(endpoint)

	formatPayload(response, &pokemonMap)

	wg.Done()
}

func formatPayload(response string, pokemonMap *map[string](Pokemon)) {
	data := Pokemon{}

	err := json.Unmarshal([]byte(response), &data)
	if err != nil {
		log.Fatalf(err.Error())
	}
	setImagePath(&data)
	(*pokemonMap)[data.Name] = data
	fmt.Println("Loading %s...", (*pokemonMap)[data.Name].Name)
}

func main() {
	urlBatch := getUrlBatches()
	bulkInfoRetrieve(urlBatch)
}
