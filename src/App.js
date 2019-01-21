import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import api from './config.js';


//import components
import Header from './components/Header';
import Gallery from './components/Gallery';
import axios from 'axios';


class App extends Component {

  state = {
    searchResults : [],
    cats: [],
    dogs: [],
    dragons: []
  }

  componentDidMount(){
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {cats : response.data.photos.photo} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {dogs : response.data.photos.photo} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=dragons&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {dragons : response.data.photos.photo} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });
  }


  callFlickr = (input) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${input}&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {searchResults : response.data.photos.photo} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });       
  }


  render() {
    const mainDisplayPhotos = [...this.state.cats, ...this.state.dogs, ...this.state.dragons,]
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={() => {
              return(
                <>
                <Header search={this.callFlickr}/>
                <Gallery photos={mainDisplayPhotos} results="Here are some photos of cats, dogs and dragons"/>
                </>
              );
            }}/>
            <Route path="/cats" component={() => {
              return(
                <>
                <Header search={this.callFlickr}/>
                <Gallery photos={this.state.cats} results="Cats"/>
                </>
              );

            }}/>
            <Route path="/dogs" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  <Gallery photos={this.state.dogs} results="Dogs"/>
                </>
              );

            }}/>
            <Route path="/dragons" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  <Gallery photos={this.state.dragons} results="Dragons"/>
                </>
              );
            }}/>
            <Route path="/search/:query" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  <Gallery photos={this.state.searchResults} results="Results"/>
                </>
              );

            }}/>
          </Switch>

        </div>
      </BrowserRouter>

      // {<Header search={this.callFlickr}/>}
    


    );
  }
}

export default App;
