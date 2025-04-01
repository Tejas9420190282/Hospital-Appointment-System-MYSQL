
const express = require('express');
const colors = require('colors');
const { mySqlPool } = require('./config/db');

const app = express();

const PORT = 1212;

mySqlPool.query("SELECT 1").then(() => {

    console.log("DB Connected Successfully".bgGreen);
    
    app.listen(PORT, () => {

        console.log(`Server running on http://localhost:${PORT}`.bgGreen);
    })

}).catch((err) => {
    
    console.log(`Error : ${err.message}`.bgRed);
})

