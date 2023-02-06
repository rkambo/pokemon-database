import React from 'react';
import './Searchbar.css';
//import { func } from 'prop-types';


class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
          cursor: 0,
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
      handleKeyDown = (e) => {
        const { cursor, suggestions } = this.state
        // arrow up/down button should select next/previous list element
        if(e.keyCode === 38 && cursor > 0){
          this.setState( prevState => ({
            cursor: prevState.cursor - 1
          }))
        }
        else if(e.keyCode === 40 && suggestions.results != null && cursor < suggestions.results.length - 1){
            this.setState( prevState => ({
            cursor: prevState.cursor + 1
          }))
        }
        else if(e.keyCode === 13){
          this.suggestionSelected(suggestions.results[cursor]);
        }
      }
      suggestionSelected(value){
        this.props.action(value.image,value.name, value.category,value.entries[Math.floor(Math.random()*value.entries.length)].entry)
        this.setState(()=> ({
          text:value.name,
          cursor: 0,
          suggestions: [],
        }))
      }
      renderSuggestions(cursor){
        const {suggestions} = this.state
        if (suggestions.results === undefined || suggestions.results.length === 0){
          return null;
        }
       return( <ul>
              {suggestions.results.map((item, i) => 
              <li 
                class = {i === cursor ? "active" : null} 
                  onClick={() => this.suggestionSelected(item)}
                  onKeyDown={this.handleKeyDown}>
                {item.name}</li>)}
            </ul>)
      }

      render() {
        const { text } = this.state
        const { cursor } = this.state
        return (
          <div className = "Searchbar">
            <input value = {text} type ='text' onChange={this.onTextChanged} onKeyDown={this.handleKeyDown}/>
            {this.renderSuggestions(cursor)}
          </div>
        );
      }
}
export default Searchbar;
