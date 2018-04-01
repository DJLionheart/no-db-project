import React, { Component } from 'react';
import axios from 'axios';

import Tracklist from './Tracklist';
import { Card } from 'reactbulma';
import apiKey from './apiKey.js';

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

    componentDidMount() {
        axios.get(`${albumCoverUrl}${apiKey}${artist}${ this.props.trackData["0"].artistName }${album}${ this.props.trackData["0"].collectionName}${format}`).then( res => {
                this.setState({
                albumCover: res.data.album.image[4]["#text"]
            })
        })
    }

    render() {
        const { albumCover } = this.state;

        return(
            <Card>
                <img src={ albumCover } alt="album cover"/>
                <h2>{ this.props.trackData["0"].collectionName }</h2>
                <h4>{ `Composed by ${ this.props.trackData["0"].artistName }` }</h4>
                <Tracklist trackData={ this.props.trackData }
                buttonFunction={ this.props.addToPlaylist }
                btnType={'plus'}/>
            </Card>
        )
    }
}

    

    


    


export default Album;