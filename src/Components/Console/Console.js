import React, { Component } from 'react';
import axios from 'axios';
//import { Box } from 'reactbulma';

import ContentPanel from './ContentPanel/ContentPanel';
import searchIds from './searchIds';
import NewPlaylist from './Playlist/NewPlaylist';

import './console.css';

const baseSearchUrl = 'https://itunes.apple.com/lookup?id=';
const baseServerUrl = '/api/gamertrax'

class Console extends Component {
    constructor() {
    super();
        this.state = {
            tracksRetrieved: [],
            userPlaylist: [],
            itunesDataReceived: false
        }
        //BIND METHODS
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
        this.clearPlaylist = this.clearPlaylist.bind(this);

    }
        

    componentDidMount() {
        //var { tracksRetrieved } = this.state;
        if(!this.state.itunesDataReceived){
            searchIds.forEach( (id ) => {
                axios.get(baseSearchUrl+id).then( res => {
                    //Destructuring using the spread operator to cut off the first object.
                    //First object is a collection object, not a track object.
                    const [collection, ...tracks] = res.data.results;
                    // let collection = res.data.results.filter( (val, i) => i != 0)
                    //console.log(collection);
                    
                    this.setState({
                        tracksRetrieved: [...this.state.tracksRetrieved, tracks]
                    })
                    axios.post(`${baseServerUrl}/add_trax`, tracks).then();
                })
            })
            this.setState({
                itunesDataReceived: true
            })            
        } else {
            axios.get(`${baseServerUrl}/get_trax`).then( res => {
                this.setState({
                    tracksRetrieved: res.data.trackContainer
                })
            })
        }

       
        axios.get(baseServerUrl).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents,
            })
        })
        
    }

    addToPlaylist( e ) {
        axios.post(baseServerUrl, e).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })    
    }

    deleteFromPlaylist( e ) {
        axios.delete(`${baseServerUrl}/${e.trackId}`).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })
    }

    clearPlaylist() {
        axios.put(baseServerUrl, {clear: []}).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContents
            })
        })
    }

    render(){

        const { tracksRetrieved, userPlaylist } = this.state;

        return(
            <div className="console_layout">
                <div className="content_panel">
                    <ContentPanel 
                    tracksRetrieved={ tracksRetrieved }
                    addToPlaylist={ this.addToPlaylist }/>
                </div>
                <div className="content_panel">
                    <NewPlaylist 
                    userPlaylist={ userPlaylist }
                    deleteFromPlaylist={ this.deleteFromPlaylist }
                    clearPlaylist={ this.clearPlaylist }/>
                </div>
                <footer>

                </footer>
            </div>
        )
    }
}

export default Console