import React, {useState} from 'react';

import '../../../css/profile.css';

function ImageEditor(props){
    let image = props.image;
    if(!image){
        image = "/static/images/logo.jpg";
    }
    return <div className="fullScreen-wrapper">
        <div className="centered">
            <img src={image}></img>
        </div>
    </div>
}

export default ImageEditor;