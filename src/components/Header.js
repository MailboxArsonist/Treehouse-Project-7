import React from 'react';

//import nav and searchform componenets
import Nav from './Nav';
import SearchForm from './SearchForm';


const Header = (props) => {
    return (
        <>
        <SearchForm search={props.search}/>
        <Nav />
        </>

    );

    
}

export default Header;