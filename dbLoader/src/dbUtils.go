/**********************************************************
*
* Description:
*
* This file contains utility functions for connecting to
* MongoDB, as well as for loading the Pokemon information
*
**********************************************************/

package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/schollz/progressbar/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Connects to the Mongo Database
func connect() *mongo.Client {
	uri := os.Getenv("DB_URI")
	if uri == "" {
		log.Fatalln("Please set Mongo DB URI in .env file")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("\nConnected to Mongo...")
	return client
}

// Disconnects from the Mongo Database
func disconnect(client *mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		log.Fatalln(err)
	}
	println("Disconnected from Mongo")
}

// Inserts the Pokemon Map via an Upsert method to MongoDB
func insertPokemon(client *mongo.Client, pokemonMap *map[string](Pokemon)) {

	coll := client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))
	bar := progressbar.Default(int64(len(*pokemonMap)))

	for _, val := range *pokemonMap {
		var doc bson.D

		filter := bson.D{{"id", val.Id}}
		data, err := bson.Marshal(val)
		if err != nil {
			return
		}

		err = bson.Unmarshal(data, &doc)
		if err != nil {
			log.Fatalln(err)
		}

		update := bson.D{{"$set", doc}}
		opts := options.Update().SetUpsert(true)

		_, err = coll.UpdateOne(context.TODO(), filter, update, opts)
		if err != nil {
			log.Fatalln(err)
		}
		bar.Add(1)
	}
}

// Wrapper function to load into the database
func loadPokemon(pokemonMap *map[string](Pokemon)) {

	client := connect()
	defer disconnect(client)

	insertPokemon(client, pokemonMap)
	fmt.Println("\nPokemon loaded!")
}
