
const axios = require('axios');
////User Data///
var playlistData = {
    playlistName: "GamerTrax Playlist",
    playlistContents: []
}

var trackContainer = [];
var iTunesDataReceived = false;

// External API:
const baseSearchUrl = 'https://itunes.apple.com/lookup?id=';

// IDs for each VGM Album
const searchIds = [
    //Skyrim
    // '596951310&entity=song',
    
    //There Came an Echo
    '997471201&entity=song'

    //Spelunky
    // '787401656&entity=song'
];

////////////
///////////////


module.exports = {

    loadTrax: (req, res) => {
        let stack = [];

        if( iTunesDataReceived === false ) {
    
            searchIds.forEach( ( id ) => {
    
                stack.push(axios.get(`${baseSearchUrl}${+id}`).then( resp => {
                    console.log(stack);
                    
                    //Destructuring using the spread operator to cut off the first object.
                    //First object is a collection object, not a track object.
                // console.log(resp);
                    const [collection, ...tracks] = resp.data.results;               
                }))  
            })
            
            Promise.all(stack).then( result => {
                console.log('result', result);
                trackContainer.push(result);
                res.status(200).send('hello');

                
                // console.log(stack);
                // console.log(trackContainer);
                // res.status(200).send(trackContainer);
                
            })

            iTunesDataReceived = true;

            // axios.all(stack).then( res => {
                


        } else {
            res.status(200).send(trackContainer);
            // res.status(200).send('hello');
        }

        // res.status(200).send(trackContainer);
        // console.log('iTunes musical specifications calibrated... (> '-' )>');
        
    },

    create: (req, res) => {
        playlistData.playlistContents.push(req.body);
        res.status(200).send(playlistData);
        // console.log('New track added to the Playlist, yo! (> '-' )>');
        

    },

    read: (req, res) => {
        res.status(200).send(playlistData);
        console.log('Doz trax just got sent, word dawg. <('-' <)');
    

    },

    update: (req, res) => {
        switch( req.body.hasOwnProperty('name') ){
            case true:
                playlistData.playlistName = req.body.name;
                res.status(200).send(playlistData);
                console.log("Dey didn't like dat playlist name... It be different now... <( -_- )>");
                break;
            case false:
                playlistData.playlistContents = req.body.clear;
                res.status(200).send(playlistData);
                console.log("Just... Just start over... <( X_X )>");
                break;
            default:
                return null;
        }
    },

    delete: (req, res) => {
        let index = null;
        playlistData.playlistContents.forEach( (val, i) => {
            if( +val.trackId === +req.params.id ){
                let index = i;
                playlistData.playlistContents.splice(index, 1);
                res.status(200).send(playlistData);
                console.log('Yeah, dat track sucked... Out with da old, in with somma dat new, eh? <( '-' )>');
                
            }
        })

    }
}