import React, { Component } from 'react';
import axios from 'axios';
//import { Container } from 'reactbulma';

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
            userPlaylist: []
            
        }
        //BIND METHODS
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);

    }
        

    componentDidMount() {
        //var { tracksRetrieved } = this.state;
        searchIds.forEach( (id ) => {
            axios.get(baseSearchUrl+id).then( res => {
                //Destructuring using the spread operator to cut off the first object.
                //First object is a collection object, not a track object.
                const [collection, ...tracks] = res.data.results;
                // let collection = res.data.results.filter( (val, i) => i != 0)
                console.log(collection);
                
                this.setState({
                    tracksRetrieved: [...this.state.tracksRetrieved, tracks]
                })
            })
        })

        axios.get(baseServerUrl).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContent,
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

    render(){

        const { tracksRetrieved, userPlaylist } = this.state;

        return(
            <div className="console_layout">
                <section className="content_panel">
                    <ContentPanel 
                    tracksRetrieved={ tracksRetrieved }
                    addToPlaylist={ this.addToPlaylist }/>
                </section>
                <section className="content_panel">
                    <NewPlaylist 
                    userPlaylist={ userPlaylist }
                    deleteFromPlaylist={ this.deleteFromPlaylist }/>
                </section>
            </div>
        )
    }
}

export default Console