import React, { useState, useEffect } from "react";
import "../styles/Searchbar.css";
import { CSSTransition } from "react-transition-group";

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

      fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/searchPokemon`,
        requestOptions
      ).then((response) => {
        response.json().then((data) => {
          setSuggestions(() => data.results);
        });
      });
    }
  }, [pokemonSearchQuery]);

  return (
    <>
      <div className="searchContainer">
        <CSSTransition
          in={suggestions && pokemonSearchQuery.length != 0}
          timeout={50}
          classNames="input-menu"
        >
          <input
            className="input-standard"
            type="text"
            onChange={handleOnChange}
          />
        </CSSTransition>
        <CSSTransition
          in={suggestions && pokemonSearchQuery.length != 0}
          timeout={50}
          classNames="dropdown-menu"
        >
          <div className="dropdown">
            {!suggestions || pokemonSearchQuery.length == 0 ? null : (
              <ul>
                {suggestions.map((item, i) => (
                  <li onClick={() => props.onClick(item)} key={item.id}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default Searchbar;
