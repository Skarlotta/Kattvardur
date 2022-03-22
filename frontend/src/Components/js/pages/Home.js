import React from 'react';

var Home = ({user}) => {
    return <div className="centered-text centered">
        <h2>Góðan dag {user.first_name} {user.last_name}</h2>
        <img src='/public/images/logo.jpg'>
        </img>
    </div>
}

export default Home;