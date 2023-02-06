import React from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './Searchbar';
import Image from './Image'
import Summarybox from './Summarybox';

class MainScreen extends React.Component{
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);

        // Set some state
        this.state = {
            imageSource:null,
            imageName:null,
            category:null,
            summary:null,
        };
    }

    handler(imgSource, imgName, pokemonCategory, pokemonSummary){
        this.setState({
            imageSource:imgSource,
            imageName:imgName,
            category:pokemonCategory,
            summary:pokemonSummary,
        })
    }
    
    render(){
        return(
        <div className="App">
            <div className = "App-header">
                <div className = "App-Component">
                <Searchbar action={this.handler}></Searchbar>
                </div>
            <div className = "App-Component">
                <Image imgsource = {this.state.imageSource} imgname = {this.state.imageName}></Image>
            </div>
            <div>
                <Summarybox category = {this.state.category} summary = {this.state.summary}></Summarybox>
            </div>
            </div>
        </div>
        )}
}

export default MainScreen