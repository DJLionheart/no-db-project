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

// Initial load: store track/albumCover data from iTunes & LastFM API on server
app.post(`${serverUrl}/add_trax`, ctrl.addTrax);

// Initial pull from LastFM API
app.post(`${serverUrl}/album_covers`, ctrl.addAlbumCover);



// Subsequent get requests for track data ----
app.get(`${serverUrl}/get_trax`, ctrl.getTrax);

// Subsequent get requests for album art urls ----
app.get(`${serverUrl}/album_covers/:albumId`, ctrl.getAlbumCover);

// Retrieve current playlist
app.get(serverUrl, ctrl.read);



// Add track to playlist
app.post(serverUrl, ctrl.create);

// Remove an individual track from playlist
app.delete(`${serverUrl}/:id`, ctrl.delete);

// Update playlist name OR clear the playlist
app.put(serverUrl, ctrl.update);





app.listen(port, console.log(`Tunes be groovin' at port ${port}    d(^o^)b¸¸♬·¯·♩¸¸♪·¯·♫¸¸`));