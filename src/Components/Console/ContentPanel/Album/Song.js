import React from 'react';
import './song.css'


const Song = (props) => {

    const { trName } = props;
    

    return (
        <div>
            <p>{ trName }</p>
        </div>
    )

}


export default Song;