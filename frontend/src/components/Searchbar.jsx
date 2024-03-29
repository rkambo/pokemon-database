import React, { useState, useEffect } from "react";
import "../styles/Searchbar.css";
import { CSSTransition } from "react-transition-group";

const Searchbar = (props) => {
  const [onDefault, setOnDefault] = useState(true);
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [cursor, setCursor] = useState(-1);

  const handleOnChange = ({ target }) => {
    const { value } = target;

    setPokemonSearchQuery(() => value);
  };

  const handleOnKeyDown = ({ key }) => {
    if (suggestions) {
      const lastSuggestion = suggestions.length - 1;
      switch (key) {
        case "ArrowDown":
          if (cursor == lastSuggestion) {
            setCursor(0);
          } else {
            setCursor((prev) => prev + 1);
          }
          break;
        case "ArrowUp":
          if (cursor == 0) {
            setCursor(lastSuggestion);
          } else {
            setCursor((prev) => prev - 1);
          }
          break;
        case "Enter":
          props.onClick(suggestions[cursor]);
      }
    }
  };

  useEffect(() => {
    if (onDefault) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/getFirstEntry`,
        requestOptions
      ).then((response) => {
        response.json().then((data) => {
          props.onClick(data.results);
          setOnDefault(false);
        });
      });
    } else if (pokemonSearchQuery.length > 0) {
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
  }, [onDefault, pokemonSearchQuery]);

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
            onKeyDown={handleOnKeyDown}
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
                  <li
                    className={i === cursor ? "active" : ""}
                    onClick={() => props.onClick(item)}
                    key={item.id}
                  >
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
