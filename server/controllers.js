
const axios = require('axios');
////User Data///
var playlistData = {
    playlistName: "GamerTrax Playlist",
    playlistContents: []
}

var trackContainer = [];

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

    hitExternal: (req, res) => {
        searchIds.forEach( (id ) => {
            axios.get(`${baseSearchUrl}${+id}`).then( res => {
                
                //Destructuring using the spread operator to cut off the first object.
                //First object is a collection object, not a track object.
                const [collection, ...tracks] = res.data.results;
                                
                trackContainer.push(tracks);    
                
            })
                //res.send(tracks);
            })
        res.status(200).send(trackContainer);
        console.log('iTunes musical specifications calibrated... (> '-' )>');
        
    },

    pullTrax: (req, res) => {
        res.status(200).send(trackContainer);
        console.log('Track data sent! <('-' <)');
    },

    create: (req, res) => {
        playlistData.playlistContents.push(req.body);
        res.status(200).send(playlistData);
        console.log('New track added to the Playlist, yo! (> '-' )>');
        

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