const express = require("express"); // entry point of out node.js app

const app = express();

const dbconfig = require('./db');
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())
app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)

app.listen(5000, () => {
  console.log("App listening on port 5000 using nodemon of hotel-reservation-system!");
});