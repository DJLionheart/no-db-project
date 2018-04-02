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

// For adding tracks to playlist.
app.post(serverUrl, ctrl.create);

// For retrieving the current playlist
app.get(serverUrl, ctrl.read);

// Initial pull from iTunes API. Track data will be stored on trackContainer variable in controllers.js
app.get(`${serverUrl}/load_trax`, ctrl.hitExternal);

// Subsequent pulls will be from the server directly to avoid too many iTunes HTTP requests.
app.get(`${serverUrl}/trax`, ctrl.pullTrax);

// Nested method to either: 1. Update the Playlist name, or 2. Clear the playlist contents (replaces with empty array)
app.put(serverUrl, ctrl.update);

// Remove a single track from playlist
app.delete(`${serverUrl}/:id`, ctrl.delete);





app.listen(port, console.log(`Tunes be groovin' yo at port ${port} <( '-' )>`));