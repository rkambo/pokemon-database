package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connect() *mongo.Client {
	uri := "mongodb+srv://<Username>:<Password>@cluster0.kq00f.azure.mongodb.net/?retryWrites=true&w=majority"
	if uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to Mongo...")
	return client
}

func disconnect(client *mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
	println("Disconnected from Mongo")
}
func insertPokemon(client *mongo.Client, pokemonMap *map[string](Pokemon)) {

	coll := client.Database("pokeDB").Collection("pokemon")

	for _, val := range *pokemonMap {
		var doc bson.D

		filter := bson.D{{"id", val.Id}}
		data, err := bson.Marshal(val)
		if err != nil {
			return
		}

		err = bson.Unmarshal(data, &doc)

		update := bson.D{{"$set", doc}}
		opts := options.Update().SetUpsert(true)

		_, err = coll.UpdateOne(context.TODO(), filter, update, opts)
		if err != nil {
			panic(err)
		}

		fmt.Println("Loaded ", val.Name)
	}
}

func loadPokemon(pokemonMap *map[string](Pokemon)) {

	// connect to Client
	client := connect()
	defer disconnect(client)

	insertPokemon(client, pokemonMap)

	// var result bson.M
	// err := collection.FindOne(context.TODO(), bson.D{{"name", "bulbasaur"}}).Decode(&result)
	// if err != nil {
	// 	panic(err)
	// }

}
