const express = require("express"); // entry point of out node.js app

const app = express();

const dbconfig = require('./db');
const roomsRoute = require('./routes/roomsRoute')


app.use('/api/rooms' , roomsRoute)

app.listen(5000, () => {
  console.log("App listening on port 5000 using nodemon of hotel-reservation-system!");
});