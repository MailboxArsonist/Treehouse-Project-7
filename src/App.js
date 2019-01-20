import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import api from './config.js';


//import components
import Header from './components/Header';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import axios from 'axios';


class App extends Component {

  state = {
    photos : []
  }


  callFlickr = (input) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${input}&per_page=24&format=json&nojsoncallback=1`)
         .then(response => {
           this.setState( {photos : response.data.photos.photo})
         })
         .catch(error => {
           console.log('Error fetching and parsing data', error);
         });
  }



  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header search={this.callFlickr}/>
          <Nav />
          <Gallery photos={this.state.photos}/>

        </div>


      </BrowserRouter>
    


    );
  }
}

export default App;
