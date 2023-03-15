import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SearchbarContainer from "./containers/SearchbarContainer";

const App = () => {
  interface Pokemon {
    name: string;
  }

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const setPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {!selectedPokemon ? (
          <h1>Loading... </h1>
        ) : (
          <h1>{selectedPokemon.name}</h1>
        )}
      </div>
      <SearchbarContainer onChange={setPokemon} />
      <div className="card"></div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;
