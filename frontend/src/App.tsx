import { useEffect, useState } from "react";
import "./styles/App.css";
import Searchbar from "./components/Searchbar";
import Image from "./components/Image";
import Summary from "./components/Summary";
import Type from "./components/Type";
import TypeRelationTable from "./components/TypeRelationTable";

const App = () => {
  interface Pokemon {
    name: string;
    imagepath: string;
    genera: Array<string>;
    flavor_text_entries: Array<string>;
    types: Array<any>;
  }

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [backendActive, setBackendActive] = useState<Boolean>();

  const setPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    if (!backendActive) {
      fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/healthCheck`)
        .then((response) => {
          setBackendActive(response.status == 200 ? true : false);
        })
        .catch((err) => {
          setBackendActive(false);
        });
    }
  }, [backendActive]);
  return (
    <div className="App">
      {backendActive == false ? (
        <h2>Backend out of service :(</h2>
      ) : (
        <div className="searchbar-container">
          <Searchbar onClick={setPokemon} />
        </div>
      )}
      {!selectedPokemon ? (
        <></>
      ) : (
        <div className="summary-container">
          <div className="container">
            <Image imagePath={selectedPokemon?.imagepath} />
            <h1 style={{ textTransform: "capitalize" }}>
              {selectedPokemon.name}
            </h1>
            <div className="type-container">
              {selectedPokemon?.types.map((type) => (
                <Type type={type.type.name}></Type>
              ))}
            </div>
          </div>
          <Summary
            category={selectedPokemon?.genera}
            entries={selectedPokemon?.flavor_text_entries}
          />
        </div>
      )}
      <TypeRelationTable types={selectedPokemon?.types}></TypeRelationTable>
    </div>
  );
};

export default App;
