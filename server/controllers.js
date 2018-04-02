
////User Data///
var playlistData = {
    playlistName: "GamerTrax Playlist",
    playlistContents: []
}

const searchIds = [

];

var trackContainer = [];

////////////
///////////////



module.exports = {

    // hitExternal: (req, res) => {

    // }

    addTrax: (req, res) => {
        trackContainer.push(req.body);
        res.status(200).send(console.log('Trax added to Server'));
        console.log(req.body);
    },

    create: (req, res) => {
        playlistData.playlistContents.push(req.body);
        res.status(200).send(playlistData);
        console.log('New track added to the Playlist, yo!');
        

    },

    read: (req, res) => {
        res.status(200).send(playlistData);
        console.log('Doz trax just got sent, word dawg.');
    

    },

    update: (req, res) => {
        switch( req.body.hasOwnProperty('name') ){
            case true:
                playlistData.playlistName = req.body.name;
                res.status(200).send(playlistData);
                console.log("Dey didn't like dat playlist name... It be different now...");
                break;
            case false:
                playlistData.playlistContents = req.body.clear;
                res.status(200).send(playlistData);
                console.log("Just... Just start over...");
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
                console.log('Yeah, dat track sucked... Out with da old, in with somma dat new, eh?');
                
            }
        })

    }
}