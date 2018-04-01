import React, { Component } from 'react';
import axios from 'axios'
//import { Button, Box, Card } from 'reactbulma';

import Tracklist from '../ContentPanel/Album/Tracklist';
import Button from '../../Button.js'

const baseServerUrl = '/api/gamertrax';

class NewPlaylist extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            playlistName: '',
        }
        //Binding
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

        return(
            <div className="playlist_main">
                <h1>{ playlistName }</h1>
                <input placeholder="Name your playlist!"
                onChange={ (e) => this.handleUserInput( e.target.value )}
                value={ userInput }/>
                <Button 
                fncType={ 'basic' }
                btnType={ 'symbol' }
                btnFunction={ this.updatePlaylistName }
                btnContents={ 'gamepad' }/>

                <div>
                    <Tracklist trackData={ this.props.userPlaylist }
                    fncType={ 'targetValue' }
                    btnType={ 'symbol' }
                    btnContents={ 'minus' }
                    btnFunction={ this.props.deleteFromPlaylist }/>

                    <Button
                    fncType={ 'basic' }
                    btnType={ 'text'}
                    btnContents={ 'Clear all songs' }/>
                    <Button
                    fncType={ 'basic' }
                    btnType={ 'text' }
                    btnContents={ 'Export' }/>
                </div>
            </div>
        )
    }
}

export default NewPlaylist;