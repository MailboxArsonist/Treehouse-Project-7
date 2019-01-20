import React from 'react';
import GalleryItem from './GalleryItem'
import NoResults from './NoResults'

const Gallery = (props) => {
    const data = props.photos;
    let galleryItems;

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
    } else {
        galleryItems = <NoResults />
    }

    
    
    return (
        <div className="photo-container">
            <h2>{props.results}</h2>
            <ul>
                {galleryItems}
            </ul>
        </div>
    );
}

export default Gallery;