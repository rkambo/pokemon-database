import { useEffect, useState } from "react";
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
  const [backendActive, setBackendActive] = useState(false);

  const setPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    if (!backendActive) {
      fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/healthCheck`).then(
        (response) => {
          setBackendActive(true);
        }
      );
    }
  }, [backendActive]);
  return (
    <div className="App">
      {!backendActive ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
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
