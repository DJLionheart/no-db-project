import React, { Component } from 'react';
import axios from 'axios';

import Tracklist from './Tracklist';
import apiKey from './apiKey.js';

import './album.css'

//const baseUrl = '/api/gamertrax';

const albumCoverUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=';
const artist = '&artist=';
const album = '&album=';
const format = '&format=json';


class Album extends Component {
    constructor() {
        super();
        this.state = {
            albumCover: ''
        }

    }

    // componentDidMount() {
    //     axios.get(`${baseUrl}/load_album_cover`).then( res => {
    //             this.setState({
    //             albumCover: res.data.album.image[4]["#text"]
    //         })
    //     })
    // }

    componentDidMount() {
        axios.get(`${albumCoverUrl}${apiKey}${artist}${ this.props.trackData[0].artistName }${album}${ this.props.trackData[0].collectionName}${format}`).then( res => {
                this.setState({
                albumCover: res.data.album.image[4]["#text"]
            })
        })
    }

    render() {
        const { albumCover } = this.state;

        return(
            <div className="album_container">
                <img className="albumCover" src={ albumCover } alt="album cover"/>
                {/* <img className="albumCover" src="https://lastfm-img2.akamaized.net/i/u/300x300/b4bd90aacd8f44cc8f2848c3be3ba971.png" alt="album cover"/> */}
                <h2>
                    { this.props.trackData["0"].collectionName }
                </h2>
                <h3>
                    { `Composed by ${ this.props.trackData["0"].artistName }` }
                </h3>
                <Tracklist trackData={ this.props.trackData }
                    fncType={ 'targetValue' }
                    btnFunction={ this.props.addToPlaylist }
                    btnType={'symbol'}
                    btnContents={'plus'}
                    btnColor={ 'blue' }
                    playBtn={ this.props.playBtn }/>
            </div>
        )
    }
}

    

    


    


export default Album;