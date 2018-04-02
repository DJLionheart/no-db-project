const axios = require('axios');

////User Data///
var playlistData = {
    playlistName: "GamerTrax Playlist",
    playlistContents: []
}

const baseSearchUrl = 'https://itunes.apple.com/lookup?id=';

const searchIds = [
    //Skyrim
    // '596951310&entity=song',
    
    //There Came an Echo
    '997471201&entity=song'

    //Spelunky
    // '787401656&entity=song'
];

var trackContainer = [];

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
            })
        res.status(200).send(trackContainer);
        //console.log('Initial musical specifications calibrated... (> '-' )>');
        
    },

    pullTrax: (req, res) => {
        res.status(200).send(trackContainer);
        console.log('iTunes Track data sent! <('-' <)');
        

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
                res.status(200).send(playlistData.playlistName);
                console.log("Dey didn't like dat playlist name... It be different now... <( -_- )>");
                break;
            case false:
                playlistData.playlistContents = req.body.clear;
                res.status(200).send(playlistData.playlistContents);
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
                res.status(200).send(playlistData.playlistContents);
                console.log('Yeah, dat track sucked... Out with da old, in with somma dat new, eh? <( '-' )>');
                
            }
        })

    }
}