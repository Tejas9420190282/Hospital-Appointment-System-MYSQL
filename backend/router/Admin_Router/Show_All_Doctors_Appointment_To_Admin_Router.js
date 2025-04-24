
// Show_All_Doctors_Appointment_To_Admin_Router.js (Node)

const express = require('express');
const { show_All_Doctors_Appointment_To_Admin_Controller } = require('../../Controller/Admin_Controller/Show_All_Doctors_AppointmentShow_To_Admin_Controller');

const show_All_Doctors_Appointment_To_Admin_Router = express.Router();

show_All_Doctors_Appointment_To_Admin_Router.get("/show_All_Doctors_Appointment_To_Admin_Router", show_All_Doctors_Appointment_To_Admin_Controller);

exports.show_All_Doctors_Appointment_To_Admin_Router = show_All_Doctors_Appointment_To_Admin_Router;