import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import api from './config.js';


//import components
import Header from './components/Header';
import Gallery from './components/Gallery';
import axios from 'axios';
import NotFound from './components/NotFound.js';
import Loading from './components/Loading';


class App extends Component {

  state = {
    searchResults : [],
    leaves: [],
    forest: [],
    sunset: [],
    loading: false
  }

  componentDidMount(){
    this.callFlickr('leaves', 'leaves');
    this.callFlickr('forest', 'forest');
    this.callFlickr('sunset', 'sunset');
  }


  callFlickr = (input, stateToUpdate) => {
    this.setState( { loading: true} )
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${input}&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {[stateToUpdate] : response.data.photos.photo, loading: false} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });       
  }


  render() {
    const mainDisplayPhotos = [...this.state.leaves, ...this.state.forest, ...this.state.sunset];
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={mainDisplayPhotos} results="Here are some photos of Leaves, Forests and Sunsets"/> }
                </>
              );
            }}/>
            <Route path="/leaves" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.leaves} results="Leaves"/>}
                </>
              );

            }}/>
            <Route path="/forest" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.forest} results="Forest"/>}
                </>
              );

            }}/>
            <Route path="/sunset" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.sunset} results="Sunset"/>}
                </>
              );
            }}/>
            <Route path="/search/:query" component={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.searchResults} results="Results"/>}
                </>
              );

            }}/>
            <Route component={NotFound}/>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
