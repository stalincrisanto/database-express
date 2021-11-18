const db = require('./database/connection');
const exercises = require('./routes/exercises');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', exercises);

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
})