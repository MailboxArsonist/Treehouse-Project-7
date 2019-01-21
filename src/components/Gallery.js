import React from 'react';

//import components 
import GalleryItem from './GalleryItem'
import NoResults from './NoResults'

const Gallery = (props) => {
    //data will hold the array of image info
    const data = props.photos;
    let galleryItems;
    //check to see if there were any results, render a <GalleryItem> for each image. Pass in image info as props
    if(data.length > 0){
        galleryItems = data.map((img, index) => {
            return (
                <GalleryItem 
                  key={index} 
                  farmId={img.farm} 
                  serverId={img.server} 
                  id={img.id} 
                  secret={img.secret} 
                  alt={img.title} />
            );  
        })
        //If data is empty, render no results found component
    } else {
        galleryItems = <NoResults />
    }

    
    
    return (
        <div className="photo-container">
            {/* {Topic prop will hold the title, check to see if galleryItems holds the noresults component} */}
            {React.isValidElement(galleryItems) ? <h2>Oh no!</h2>: <h2>Images of: {props.topic}</h2>}
            <ul>
                {galleryItems}
            </ul>
        </div>
    );
}

export default Gallery;