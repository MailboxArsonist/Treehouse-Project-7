import React, { Component } from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
//import aki key from config folder
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
    title: '',
    loading: false
  }
  //On comp mount, callFlickr for each topic button, store in state.
  componentDidMount(){
    this.callFlickr('leaves', 'leaves');
    this.callFlickr('forest', 'forest');
    this.callFlickr('sunset', 'sunset');
  }

  //Makes a get request to the flickr API, stores an array of images in state. 1st param is the tag to search api, 2nd is the state to update in app.js
  callFlickr = (input, stateToUpdate) => {
    //While a request is being made, loading = true
    this.setState( { loading: true} )
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${input}&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           //set state, once response has been received, loading can be set to false
           this.setState( {[stateToUpdate] : response.data.photos.photo, loading: false, title: input} )
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });       
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
        {/*Set up routes*/}
          <Switch>
            {/*On main page redirect to /forest */}
            <Route exact path="/" render={() =>  <Redirect to="/forest" />}/>

            <Route exact path="/leaves" render={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {/*If images have not yet been fetched, show loading page, otherwise render the gallery. photos prop is array of photos*/}
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.leaves} topic="Leaves"/>}
                </>
              );

            }}/>
            <Route exact path="/forest" render={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.forest} topic="Forests"/>}
                </>
              );

            }}/>

            <Route exact path="/sunset" render={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.sunset} topic="Sunsets"/>}
                </>
              );
            }}/>

            <Route exact path="/search/:id" render={() => {
              return(
                <>
                  <Header search={this.callFlickr}/>
                  {this.state.loading ? <Loading /> : <Gallery photos={this.state.searchResults} topic={this.state.title}/>}
                </>
              );

            }}/>
            {/*If no routes, render 404 not found component */}
            <Route component={NotFound}/>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
