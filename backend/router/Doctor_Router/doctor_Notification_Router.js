
// doctor_Notification_Router.js (Node)

const express = require('express');
const { doctor_Notification_Controller } = require('../../Controller/Doctor_Controller/doctor_Notification_Controller');


const doctor_Notification_Router = express.Router();

// Support both GET and POST methods
doctor_Notification_Router.get("/doctor/notification", doctor_Notification_Controller);
doctor_Notification_Router.post("/doctor/notification", doctor_Notification_Controller); 


module.exports = doctor_Notification_Router;

