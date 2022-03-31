import React, {useState} from 'react';

import '../../../css/profile.css';

function ProfileImage(props){
    let image = props.image;
    if(!image){
        image = "/static/images/logo.jpg";
    }
    return <div className="profile-image-wrapper">
        <img onClick={props.onClick} className="profile-image" src={image} alt=""></img>
        </div>
}

export default ProfileImage;