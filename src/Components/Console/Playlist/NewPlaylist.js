import React, { Component } from 'react';
import axios from 'axios'
import { Button, Box, Card } from 'reactbulma';
import FontAwesome from 'react-fontawesome';

import Tracklist from '../ContentPanel/Album/Tracklist';

const baseServerUrl = '/api/gamertrax';

class NewPlaylist extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            playlistName: '',
        }
    }

    componentDidMount() {
        axios.get(baseServerUrl).then( res => {
            this.setState({
                playlistName: res.data.playlistName,
            })
        })
    }

    handleUserInput( e ) {
        this.setState({
            userInput: e
        })
    }

    updatePlaylistName() {
        axios.put(baseServerUrl, {name: this.state.userInput}).then( res => {
            this.setState({
                playlistName: res.data.playlistName,
                userInput: ''
            })
        })
    }

    render() {
        const { playlistName, userInput } = this.state;
        const { userPlaylist, deleteFromPlaylist } = this.props;

        return(
            <Box className="playlist_main">
                <h1>{ playlistName }</h1>
                <input placeholder="Name your playlist!"
                onChange={ (e) => this.handleUserInput( e.target.value )}
                value={ userInput }/>

                <Button onClick={ () => this.updatePlaylistName }>
                    <FontAwesome name='gamepad' />
                </Button>

                <Card>
                    <Tracklist trackData={ userPlaylist }
                    btnType={ 'minus' }
                    buttonFunction={ deleteFromPlaylist }/>

                    <Button danger>Clear all songs</Button>
                    <Button info>Export</Button>
                </Card>
            </Box>
        )
    }
}

export default NewPlaylist;