package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func getURLBatches(endpoint string) {
	resp, err := http.Get(endpoint)
	if err != nil {
		log.Fatalf(err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}

func main() {
	endpoint := "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
	getURLBatches(endpoint)
}
