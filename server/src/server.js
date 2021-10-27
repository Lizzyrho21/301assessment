'use strict';

const express = require('express');
const cors = require('cors');
const Data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// This endpoint will route to get all items
app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem);
app.post('/items', Data.addAnItem);
// Add support for delete
app.delete('/items/:id', Data.deleteOneItem);

// catch all for anything that dont match
app.use('*', (req,res) => {
  res.status(404).send('Nothing matched.');
});

app.use( (error,req,res,next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

// I know this looks different than what you have seen in class, but this is how we need to write the code for testing.
// The index.js is calling the start function to turn on the server.
// There are no errors in the code below. Do not make any changes to these lines.
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
