import React from 'react';

import Tracklist from './Tracklist';
import { Card } from 'reactbulma';




const Album = (props) => {
    

    
    return (
        <Card>
            <img src={ props.trackData[0].artworkUrl100 } alt="album cover"/>
            <h2>{ props.trackData["0"].collectionName }</h2>
            <h4>{ `Composed by ${ props.trackData["0"].artistName }` }</h4>
            <Tracklist trackData={ props.trackData }
            buttonFunction={ props.addToPlaylist }
            btnType={'plus'}/>
        </Card>
    )
}
    

    


    


export default Album;