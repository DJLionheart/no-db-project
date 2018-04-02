//////////
///
////////
/////
///////////////
/////////////////////////////
//////////////////
////////////
///////           GamerTrax Server
////////     Music That Moves You...
/////        
//////////////////
////////////////////////////
////////////////////////////////////////


const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controllers')


const app = express();
const port = 4025;
const serverUrl = "/api/gamertrax"

app.use(bodyParser.json());


//////
// Endpoints 
////////

// Initial pull from iTunes API. Track data will be stored on trackContainer variable in controllers.js. If trackContainer is not empty, stored tracks will be sent. 
app.get(`${serverUrl}/load_trax`, ctrl.loadTrax);


// app.get(`${serverUrl}/load_album/cover`, ctrl.loadAlbumCover);

// For retrieving the current playlist
app.get(serverUrl, ctrl.read);

// For adding tracks to playlist.
app.post(serverUrl, ctrl.create);

// Nested method to either: 1. Update the Playlist name, or 2. Clear the playlist contents (replaces with empty array)
app.put(serverUrl, ctrl.update);

// Remove a single track from playlist
app.delete(`${serverUrl}/:id`, ctrl.delete);





app.listen(port, console.log(`Tunes be groovin' yo at port ${port} <( '-' )>`));