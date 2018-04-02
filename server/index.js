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

// Initial load: store track data from iTunes API on server
app.post(`${serverUrl}/add_trax`, ctrl.addTrax);

app.get(`${serverUrl}/get_trax`, ctrl.getTrax);
// Add track to playlist
app.post(serverUrl, ctrl.create);

// Retrieve current playlist
app.get(serverUrl, ctrl.read);

// Either: 1. update playlist name, or 2. clear the playlist
app.put(serverUrl, ctrl.update);

// Remove an individual track from playlist
app.delete(`${serverUrl}/:id`, ctrl.delete);





app.listen(port, console.log(`Tunes be groovin' yo at port ${port} <( '-' )>`));