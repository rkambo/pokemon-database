import { useState } from "react";
import "./styles/App.css";
import Searchbar from "./components/Searchbar";
import Image from "./components/Image";
import Summary from "./components/Summary";

const App = () => {
  interface Pokemon {
    name: string;
    imagepath: string;
    genera: Array<string>;
    flavor_text_entries: Array<string>;
  }

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const setPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="App">
      <div className="searchbar-container">
        {!selectedPokemon ? (
          <h1>Who's that Pokemon?</h1>
        ) : (
          <h1 style={{ textTransform: "capitalize" }}>
            {selectedPokemon.name}
          </h1>
        )}
        <Searchbar onClick={setPokemon} />
      </div>

      {!selectedPokemon ? (
        <></>
      ) : (
        <div className="summary-container">
          <Image imagePath={selectedPokemon?.imagepath} />
          <Summary
            category={selectedPokemon?.genera}
            entries={selectedPokemon?.flavor_text_entries}
          />
        </div>
      )}
    </div>
  );
};

export default App;
