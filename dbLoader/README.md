## Pokemon Database Loader Utility

### Compilation and Execution

To compile the go files, run the following command in the root directory:

<code>go build bin/runMe src/\*.go</code>

and to run the build, use the command:

<code>./bin/runMe</code>

### Env structure

```

LOG_FILEPATH="/res/log.txt"
REF_FILEPATH="/res/ref.json"


POKEAPI_GENERATION="https://pokeapi.co/api/v2/generation"
POKEAPI_IMAGEPATHPREFIX="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
POKEAPI_SPECIESQUERY="https://pokeapi.co/api/v2/pokemon-species?limit=10000"


DB_COLLECTION=[your-db-collection]
DB_NAME=[your-db-name]
DB_PASSWORD=[your-db-password]
DB_USERNAME=[your-db-username]
DB_URI=[your-db-uri]
```
