
// show_All_Doctors_Appointment_To_Admin_Controller.js

const { mySqlPool } = require("../../config/db");

const show_All_Doctors_Appointment_To_Admin_Controller = async (req, res) => {
    try {
        
        const [appointmentList] = await mySqlPool.query(
            "SELECT * FROM appointment"
        );

        if (appointmentList.length === 0) {
            
            console.log("No data found of Appointment List...".bgRed);
            
            return res.status(400).json({
                success : true,
                message : "No data found of Appointment List..."
            })
        }

        res.status(200).json({
            success : true,
            message : "All doctord appoint data featch successfully...",
            appointmentList : appointmentList
        })

    } catch (error) {
        
        console.log(`Error in show_All_Doctors_Appointment_To_Admin_Controller API : ${error.message}`);

        res.status(400).json({
            success : false,
            message : `Error in show_All_Doctors_Appointment_To_Admin_Controller API : ${error.message}`
        })
        
    }
}

exports.show_All_Doctors_Appointment_To_Admin_Controller = show_All_Doctors_Appointment_To_Admin_Controller;