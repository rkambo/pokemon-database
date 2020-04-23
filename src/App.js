import React from 'react';
import Searchbar from'./Searchbar.js';
import './App.css';
import {PostRequestAsyncAwait} from './PostRequestAsync.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PostRequestAsyncAwait></PostRequestAsyncAwait>
      </header>
    </div>
  );
}

export default App;
