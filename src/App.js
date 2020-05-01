import React from 'react';
import Searchbar from'./Searchbar.js';
import './App.css';
import {PostRequestAsyncAwait} from './PostRequestAsync.js';

function App() {
  return (
    <div className="App">
      <div className = "App-header">
     <div className = "App-Component">
     <Searchbar></Searchbar>
     </div>
     </div>
    </div>
  );
}

export default App;
