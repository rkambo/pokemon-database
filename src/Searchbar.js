import React from 'react';
import './Searchbar.css';
import { func } from 'prop-types';


class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.items = ['David', 'Damien', 'Sara', 'Jane']
        this.state = {
          suggestions: [],
          text: '',
        }
      }

      componentDidMount() {
        const fetchdata = async () => {
  
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
  //          body: JSON.stringify({ name: value })
        };
          const response = await fetch('http://localhost:3001/searchPokemon', requestOptions);
          const data = await response.json();
          
        }
      }

      onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        //this.fetchData(value);

        if (value.length > 0){
          // const regex = new RegExp(`^${value}`,'i');
          // suggestions = this.items.sort().filter(v => regex.test(v))
          suggestions = [{name:'Bulbasaur'}, {name:'Venusaur'}, {name: 'Charmander'}];
          //suggestions = ['Bulbasaur', 'Venusaur', 'Charmander']

        }
        this.setState(() => ({
          suggestions,
          text : value.name
        }))
      }

      suggestionSelected(value){
        this.setState(()=> ({
          text:value.name,
          suggestions: [],
        }))
      }
      renderSuggestions(){
        const {suggestions} = this.state
        if (suggestions.length === 0){
          return null;
        }
       return( <ul>
              {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item.name}</li>)}
            </ul>)
      }
    
      
      
      render() {
        const { text } = this.state
        return (
          <div className = "Searchbar">
            <input value = {text} type ='text' onChange={this.onTextChanged}/>
            {this.renderSuggestions()}
          </div>
        );
      }
}
export default Searchbar;
