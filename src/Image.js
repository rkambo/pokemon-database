import React from 'react';
import ReactDOM from 'react-dom';


class Image extends React.Component{
    render(){
        return (<img src={this.props.imgsource} alt={this.props.imgname}></img>)}
}
export default Image