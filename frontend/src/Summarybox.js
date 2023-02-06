import React from 'react';
import './Summarybox.css';
//import { func } from 'prop-types';


class Summarybox extends React.Component{
  render(){
      return (<div>
        <p>
        {this.props.category}
        </p>
        <p>
          {this.props.summary}
        </p>
        </div>)}
}
export default Summarybox
