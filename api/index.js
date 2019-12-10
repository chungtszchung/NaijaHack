const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require("./route")





// Connect to our Database and handle an bad connections
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
  };
  mongoose.connect('mongodb+srv://ubd:123ubd@inspired-karaoke-wifkx.gcp.mongodb.net/naijahacks?retryWrites=true', options);
  mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
const app = express()



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route)



app.set('port', 4000)

const server = app.listen(app.get('port'), () => {
    console.log(`running → PORT ${server.address().port}`);
  });