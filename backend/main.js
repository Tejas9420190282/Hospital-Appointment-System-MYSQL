
// main.js

const express = require('express');
const colors = require('colors');
const { mySqlPool } = require('./config/db');

const cors = require('cors');
const { admin_Doctor_Login_Router } = require('./router/Admin_Router/Admin_Doctor_Login_Router');
const { create_Doctor_Router } = require('./router/Admin_Router/Create_Doctor_Router');


const app = express();

app.use(cors({origin:"http://localhost:5173", credentials:true}))

app.use(express.json({ limit: '50mb' })); // For JSON requests
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded requests

app.use(admin_Doctor_Login_Router);
app.use(create_Doctor_Router);

const PORT = 1212;
mySqlPool.query("SELECT 1").then(() => {

    console.log("DB Connected Successfully".bgGreen);
    
    app.listen(PORT, () => {

        console.log(`Server running on http://localhost:${PORT}`.bgGreen);
    })

}).catch((err) => {
    
    console.log(`Error : ${err.message}`.bgRed);
})

