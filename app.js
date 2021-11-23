const db = require('./database/connection');
const exercises = require('./routes/exercises');
const members = require('./routes/members');
const facilities = require ('./routes/facilities');
const bookings = require ('./routes/bookings');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', exercises);
app.use('/',members);
app.use('/',facilities);
app.use('/',bookings);

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
})