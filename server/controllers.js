
////User Data///
var playlistData = {
    playlistName: "GamerTrax Playlist",
    playlistContents: []
}

////////////
///////////////



module.exports = {
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
        playlistData.playlistName = req.body.name;
        res.status(200).send(playlistData);
        console.log("Dey didn't like dat playlist name... It be different now...");
        
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