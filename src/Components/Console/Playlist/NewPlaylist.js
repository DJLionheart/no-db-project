import React, { Component } from 'react';
import axios from 'axios'
//import { Button, Box, Card } from 'reactbulma';

import Tracklist from '../ContentPanel/Album/Tracklist';
import Button from '../../Button.js'

import './playlist.css';

const baseUrl = '/api/gamertrax';

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
        axios.get(baseUrl).then( res => {
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
        axios.put(baseUrl, {name: this.state.userInput}).then( res => {
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
                <section className="playlist_heading">
                    <h1>{ playlistName }</h1>
                </section>
                <section className="playlist_controls_top">
                    <input placeholder="Name your playlist!"
                        onChange={ (e) => this.handleUserInput( e.target.value )}
                        value={ userInput }/>
                        <Button 
                        fncType={ 'basic' }
                        btnType={ 'symbol' }
                        btnColor={ 'green'}
                        btnFunction={ this.updatePlaylistName }
                        btnContents={ 'gamepad' }/>
                </section>
                <div className="song_field">
                    <Tracklist trackData={ this.props.userPlaylist }
                    fncType={ 'targetValue' }
                    btnType={ 'symbol' }
                    btnContents={ 'minus' }
                    btnColor={ 'red' }
                    btnFunction={ this.props.deleteFromPlaylist }/>
                </div>
                <div className="playlist_controls_bottom">
                    <Button
                    fncType={ 'basic' }
                    btnType={ 'text'}
                    btnContents={ 'Clear all songs' }
                    btnColor={ 'red' }
                    btnFunction={ this.props.clearPlaylist }/>
                </div>
            </div>
        )
    }
}

export default NewPlaylist;