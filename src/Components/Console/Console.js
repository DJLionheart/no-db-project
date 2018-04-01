import React, { Component } from 'react';
import axios from 'axios';

import ContentPanel from './ContentPanel/ContentPanel';
import Playlist from './Playlist/Playlist';
import searchIds from './searchIds';

const baseSearchUrl = 'https://itunes.apple.com/lookup?id=';
const baseServerUrl = '/api/gamertrax'

class Console extends Component {
    constructor() {
    super();
        this.state = {
            tracksRetrieved: [],
            userPlaylist: [],
                // {
                //     "artistName": "Jeremy Soule",
                //     "collectionName": "The Elder Scrolls V: Skyrim (Original Game Soundtrack)",
                //     "trackName": "Dragonborn"
                // }
            userInput: '',
            playlistName: ''
            
        }

        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.updateName = this.updateName.bind(this);
    }
        

    componentDidMount() {
        //var { tracksRetrieved } = this.state;
        searchIds.forEach( (id ) => {
            axios.get(baseSearchUrl+id).then( res => {
                //Destructuring using the spread operator to cut off the first object.
                //First object is a collection object, not a track object.
                const [collection, ...tracks] = res.data.results;
                // let collection = res.data.results.filter( (val, i) => i != 0)
                this.setState({
                    tracksRetrieved: [...this.state.tracksRetrieved, tracks]
                })
            })
        })

        axios.get(baseServerUrl).then( res => {
            this.setState({
                userPlaylist: res.data.playlistContent,
                playlistName: res.data.playlistName
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
        //let filteredArray = this.state.userPlaylist.filter( val => val !== e );
        
    }

    handleUserInput( e ) {
        this.setState({
            userInput: e
        })
    }

    updateName() {
        axios.put(baseServerUrl, {name: this.state.userInput}).then( res => {
            this.setState({
                playlistName: res.data.playlistName,
                userInput: ''
            })
        })
    }

    render(){

        const { tracksRetrieved, userPlaylist, playlistName } = this.state;

        return(
            <div>
                <ContentPanel 
                tracksRetrieved={ tracksRetrieved }
                addToPlaylist={ this.addToPlaylist }/>
                <Playlist 
                playlistName={ playlistName }
                handleUserInput={ this.handleUserInput }
                updateName={ this.updateName }
                playlistData={ userPlaylist }
                deleteFromPlaylist={ this.deleteFromPlaylist }/>
            </div>
        )

    }

}
export default Console