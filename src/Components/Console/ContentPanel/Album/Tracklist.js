import React from 'react';

import Song from './Song';
import { Button } from 'reactbulma';
import FontAwesome from 'react-fontawesome';

const Tracklist = (props) => {
    if( props.trackData === undefined ){
        return(
            <div>
                <h3>Playlist empty... Add some Trax</h3>
            </div>
        )
    } else {
    
        const trackMap = props.trackData.map( (song, inde) => {
        
        return(
            <div key={ inde }>
                <Song trName={ song.trackName }/>
                <Button onClick={ () => props.buttonFunction( song )}>
                    <FontAwesome name={ props.btnType } />
                </Button>
            </div>
        )

    })

    return (
        <div>
            { trackMap }
        </div>
    )}
}

export default Tracklist;