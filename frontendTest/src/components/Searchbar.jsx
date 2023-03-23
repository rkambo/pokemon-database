import React, { useState, useEffect } from "react";
import "../styles/Searchbar.css";

const Searchbar = (props) => {
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const handleOnChange = ({ target }) => {
    const { value } = target;

    setPokemonSearchQuery(() => value);
  };

  useEffect(() => {
    if (pokemonSearchQuery.length > 0) {
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
    <div className="Searchbar" style={{ width: "400px" }}>
      <input type="text" onChange={handleOnChange} />
      <ul>
        {!suggestions
          ? null
          : suggestions.map((item, i) => (
              <li onClick={() => props.onClick(item)} key={item.id}>
                {item.name}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Searchbar;
