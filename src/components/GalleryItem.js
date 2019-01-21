import React from 'react';

const GalleryItem = (props) => {
    //Renders an image
    return (
        <li>
            <img src={`https://farm${props.farmId}.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`} alt={props.alt} />
        </li>
    );
}

export default GalleryItem;