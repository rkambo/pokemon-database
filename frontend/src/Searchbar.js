import React from 'react';
import './Searchbar.css';
//import { func } from 'prop-types';


class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          suggestions: [],
          text: '',
        }
      }

      onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];

        if (value.length > 0){

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: value.toLowerCase() })
        };
        this.setState(() => ({
          text:value.name
        }))
          fetch('http://localhost:3001/searchPokemon', requestOptions).then(res => {
            res.json().then((response) => {
              suggestions = response;
              this.setState(() => ({
                suggestions,
              }))
              this.renderSuggestions();
            });
          }); 
        }
        else{
          this.setState(() => ({
            suggestions,
            text : value.name
          }))
        }
      }

      suggestionSelected(value){
        this.props.action(value.image,value.name)
        this.setState(()=> ({
          text:value.name,
          suggestions: [],
        }))
      }
      renderSuggestions(){
        const {suggestions} = this.state
        if (suggestions.results === undefined || suggestions.results.length === 0){
          return null;
        }
       return( <ul>
              {suggestions.results.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item.name}</li>)}
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
