
// doctor_Notification_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const doctor_Notification_Controller = async (req, res) => {
    // Get doctorId from either query params (GET) or body (POST)
    const doctorId = req.query.doctorId || req.body.doctorId;

    try {
        // Validate doctorId exists and is a number
        if (!doctorId || isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Valid doctor ID is required"
            });
        }

        console.log(doctorId);
        

        // First verify the doctor exists
        const [doctor] = await mySqlPool.query(
            "SELECT id FROM doctor WHERE id = ?", 
            [doctorId]
        );

        if (!doctor.length) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found in database"
            });
        }
        

        // Then fetch notifications
        const [notifications] = await mySqlPool.query(
            `SELECT * FROM notification 
             WHERE doctor_id = ? 
             ORDER BY created_at DESC`,
            [doctorId]
        );

        console.log(notifications);
        

        // Return success even if no notifications exist
        res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            notifications, // Return empty array if none exist
            doctorExists: true // Additional confirmation
        });

    } catch (error) {
        console.error("Notification error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.doctor_Notification_Controller = doctor_Notification_Controller;





/* 
const { mySqlPool } = require("../../config/db");


const doctor_Notification_Controller = async (req, res) => {
    
    const doctorId = req.query.doctorId || req.body.doctorId;

    try {
        if (!doctorId) {
            console.log("doctorid is not found.....");

            return res.status(400).json({
                success: false,
                message: "doctorid is not found.....",
            });
        }

        console.log("DoctorId : ", req.query);

        const [notifications] = await mySqlPool.query(
            `SELECT * FROM notification 
             WHERE doctor_id = ? 
             ORDER BY created_at DESC`,
            [doctorId]
        );      

        res.status(200).json({
            success: true,
            message: "notification send Successfuly....",
            notification : notifications,
        });
    
    } catch (error) {
        console.log(
            `Error in doctor_Notification_Controller API : ${error.message}`
        );

        res.status(500).json({
            success: false,
            message: `Error in doctor_Notification_Controller API : ${error.message}`,
        });
    }
};

exports.doctor_Notification_Controller = doctor_Notification_Controller;
 */