import React from 'react';
import { func } from 'prop-types';


class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
        
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          </form>
        );
      }
}
export default Searchbar;
