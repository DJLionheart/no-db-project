import React from 'react';
import gtlogo from './gamertrax_logo.png';

import './logo.css'
const Logo = () => {
    return (
        <div className="logo_container">
            <img src={gtlogo} alt="GamerTrax logo"/>
        </div>
    )
}

export default Logo;