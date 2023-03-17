import { React, useState } from "react";
import Searchbar from "../components/Searchbar";

const SearchbarContainer = () => {
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");

  handleOnChange((event) => {});
  //   useEffect(() => {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name: value.toLowerCase() }),
  //     };

  //     fetch("http://localhost:3001/searchPokemon", requestOptions).then(
  //       (menuResponse) => {
  //         alert(menuResponse.data);
  //       }
  //     );
  //   }, []);

  return <input type="text" />;
};

export default SearchbarContainer;
