import React, { Component } from 'react';
import axios from 'axios';

import Tracklist from './Tracklist';
import apiKey from './apiKey.js';

import './album.css'

const albumCoverUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=';
const artist = '&artist=';
const album = '&album=';
const format = '&format=json';

const baseServerUrl = '/api/gamertrax';

class Album extends Component {
    constructor() {
        super();
        this.state = {
            albumCoverUrl: '',
            sentToServer: false,
            albumId: null

        }

    }

    componentDidMount() {
        if( this.state.sentToServer === false ) {

            //Search Query for LastFM API
            axios.get(`${ albumCoverUrl }${ apiKey }${ artist }${ this.props.trackData[0].artistName }${album}${ this.props.trackData[0].collectionName }${ format }`).then( res => {
                    const album_url = res.data.album.image[4]["#text"] 
                    
                    this.setState({
                    albumCoverUrl: album_url
                })

                axios.post(`${ baseServerUrl }/album_covers`, {url: album_url}).then( res => {
                    this.setState({
                        albumId: +res.data,
                        sentToServer: true
                    });
                });
            });

        } else {

            axios.get(`${baseServerUrl}/album_covers/${ this.state.albumId }`).then( res => {
                this.setState({
                    albumCoverUrl: res.data.url
                })
            })

        }
    }

    render() {
        const { albumCoverUrl } = this.state;

        return(
            <div className="album_container">
                <img className="albumCover" src={ albumCoverUrl } alt="album cover"/>
                
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
                    btnColor={ 'blue' }/>
            </div>
        )
    }
}

    

    


    


export default Album;