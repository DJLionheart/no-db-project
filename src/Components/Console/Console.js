import React, { Component } from 'react';
import axios from 'axios';
//import { Box } from 'reactbulma';

import ContentPanel from './ContentPanel/ContentPanel';
//import searchIds from './searchIds';
import NewPlaylist from './Playlist/NewPlaylist';

import './console.css';

const baseUrl = '/api/gamertrax';

class Console extends Component {
    constructor() {
    super();
        this.state = {
            // externalSearch: false,
            tracksRetrieved: [],
            userPlaylist: []
            // url: '',
            // audio: null,
            // play: false
    
            
        }
        //BIND METHODS
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
        this.clearPlaylist = this.clearPlaylist.bind(this);
        // this.togglePlay = this.togglePlay.bind(this);

    }
        

    componentDidMount() {
       
        // Pull tracks from server (iTunes API request)...
        axios.get(`${baseUrl}/load_trax`).then( res => {
            
            this.setState({
                tracksRetrieved: res.data
            })
        })

        axios.get(baseUrl).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })
    }

    addToPlaylist( e ) {
        axios.post(baseUrl, e).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })    
    }

    deleteFromPlaylist( e ) {
        axios.delete(`${baseUrl}/${e.trackId}`).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })
    }

    clearPlaylist() {
        axios.put(baseUrl, {clear: []}).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })
    }

    // togglePlay( e ) {
    //     this.setState({
    //         play: !this.state.play,
    //         url: e.previewUrl,
    //         audio: new Audio(this.state.url)
    //     })
    //     this.state.play ? this.audio.play() : this.audio.pause();
    // }


    render(){

        const { tracksRetrieved, userPlaylist } = this.state;

        return(
            <div className="console_layout">
                <div className="content_panel">
                    <ContentPanel 
                    tracksRetrieved={ tracksRetrieved }
                    addToPlaylist={ this.addToPlaylist }/>
                    {/* playBtn={ this.togglePlay } */}
                </div>
                <div className="content_panel">
                    <NewPlaylist 
                    userPlaylist={ userPlaylist }
                    deleteFromPlaylist={ this.deleteFromPlaylist }
                    clearPlaylist={ this.clearPlaylist }/>
                    {/* playBtn={ this.togglePlay } */}
                </div>
                <footer>

                </footer>
            </div>
        )
    }
}

export default Console