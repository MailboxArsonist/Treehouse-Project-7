import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

//import components
import Header from './components/Header';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import GalleryItem from './components/GalleryItem';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Nav />
          <Gallery />
          <GalleryItem />

        </div>


      </BrowserRouter>
    


    );
  }
}

export default App;
