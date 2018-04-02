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

app.post(serverUrl, ctrl.create);


app.get(serverUrl, ctrl.read);

app.get(`${serverUrl}/trax`, ctrl.hitExternal);


app.put(serverUrl, ctrl.update);


app.delete(`${serverUrl}/:id`, ctrl.delete);





app.listen(port, console.log(`Tunes be groovin' yo at port ${port} <( '-' )>`));