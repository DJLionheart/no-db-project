import React from 'react';
import { Button, Box, Card } from 'reactbulma';
import FontAwesome from 'react-fontawesome';

import Tracklist from '../ContentPanel/Album/Tracklist'




const Playlist = (props) => {
    //Destructuring
    const { playlistName, userInput, playlistData, deleteFromPlaylist, updateName } = props;
    
    return(
        <Box className="main_playlist">
            <h1>{ playlistName }</h1>
            <input placeholder="Name your playlist!"
            onChange={ (e) => props.handleUserInput( e.target.value )}
            value={ userInput }/>
            <Button onClick={ () => updateName() }>
                <FontAwesome name='gamepad' />
            </Button>
            <Card>
                <Tracklist trackData={ playlistData }
                btnType={'minus'}
                buttonFunction={ deleteFromPlaylist }
                />
                <Button danger>Clear all songs</Button>
                <Button info>Export</Button>    
            </Card>
        </Box>
    )
}


        // const list = userPlaylist.map( ( e, i ) => {
        //     return (
        //         <div key={i}>
        //             <Song 
        //             trName={ e.track }/>
        //             <Button><FontAwesome name="trash"/></Button>

        //         </div>
        //     )
        // });        


export default Playlist;