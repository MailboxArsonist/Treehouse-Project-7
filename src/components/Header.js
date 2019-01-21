import React from 'react';

//import nav and searchform componenets
import Nav from './Nav';
import SearchForm from './SearchForm';


const Header = (props) => {
    //Render searchform and nav
    return (
        <>
          <SearchForm search={props.search}/>{/*props.search is callFlickr function in app.js.*/}
          <Nav />
        </>

    );

    
}

export default Header;