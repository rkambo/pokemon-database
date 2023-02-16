package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"sync"

	"github.com/schollz/progressbar/v3"
)

type Pokemon struct {
	Id     int    `json:"id" bson:"id"`
	Name   string `json:"name" bson:"name"`
	Image  string `bson:"imagepath"`
	Genera []struct {
		Category string `json:"genus" bson:"genus"`
	}
	Flavor_Text_Entries []struct {
		Entry    string `json:"flavor_text" bson:flavor_text`
		Language struct {
			Name string `json:"name" bson:"name"`
		}
	}
}

var mutex = &sync.Mutex{}

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

func bulkInfoRetrieve(batch []string) (pokemonMapResponse *map[string](Pokemon)) {
	pokemonMap := make(map[string](Pokemon))

	var wg sync.WaitGroup
	bar := progressbar.Default(int64(len(batch)))

	for _, v := range batch {
		wg.Add(1)
		go wrapApiCallout(&wg, v, &pokemonMap, bar)
	}

	wg.Wait()

	return &pokemonMap
}

func wrapApiCallout(wg *sync.WaitGroup, endpoint string, pokemonMap *map[string](Pokemon), bar *progressbar.ProgressBar) {
	defer mutex.Unlock()
	defer wg.Done()
	mutex.Lock()
	response := apiCallout(endpoint)

	formatPayload(response, pokemonMap)
	bar.Add(1)
}

func formatPayload(response string, pokemonMap *map[string](Pokemon)) {
	data := Pokemon{}

	err := json.Unmarshal([]byte(response), &data)
	if err != nil {
		log.Fatalf(err.Error())
	}
	setImagePath(&data)
	(*pokemonMap)[data.Name] = data
}

func loadDB() {
	fmt.Println("Getting URL Batch...")
	urlBatch := getUrlBatches()
	fmt.Println("Batch Retrieved! Retrieving Pokemon info...")
	pokemonMap := bulkInfoRetrieve(urlBatch)
	fmt.Println("Info Retrieved! Loading into DB...")
	loadPokemon(pokemonMap)
	fmt.Println("Program Complete!")
}
