import React from 'react';



const Song = (props) => {

    const { trName } = props;
    

    return (
        <div>
            <p>{trName}</p>
        </div>
    )

}


export default Song;