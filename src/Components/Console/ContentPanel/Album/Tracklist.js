import React from 'react';

import Song from './Song';
//import { Button } from 'reactbulma';
import './tracklist.css'
import FontAwesome from 'react-fontawesome';
import Button from '../../../Button'

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
            <div className="tracklist" key={ inde }>
                <Song trName={ song.trackName }/>
                <Button btnFunction={() => props.btnFunction(song) }
                fncType={ 'targetValue' }
                btnType={ props.btnType }
                btnContents={ props.btnContents }
                btnColor={ props.btnColor }/>
                {/* <Button btnFunction={() => props.playBtn(song) }
                fncType={ 'targetValue' }
                btnType={ 'symbol' }
                btnContents={ 'play' }
                btnColor={ 'green' }/>  */}
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