import React, { useState, useEffect } from "react";

const Searchbar = () => {
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const handleOnChange = ({ target }) => {
    const { value } = target;

    setPokemonSearchQuery(() => value);
  };

  useEffect(() => {
    if (pokemonSearchQuery.length > 2) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: pokemonSearchQuery.toLowerCase() }),
      };

      fetch("http://localhost:3001/searchPokemon", requestOptions).then(
        (response) => {
          response.json().then((data) => {
            setSuggestions(() => data.results);
          });
        }
      );
    }
  }, [pokemonSearchQuery]);

  return (
    <div>
      <input type="text" onChange={handleOnChange} />
    </div>
  );
};

export default Searchbar;
