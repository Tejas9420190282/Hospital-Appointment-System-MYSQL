
// doctor_Notification_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const doctor_Notification_Controller = async (req, res) => {
    const doctorId = req.query.doctorId || req.body.doctorId;

    try {
        // Validate doctorId
        if (!doctorId || isNaN(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Valid doctor ID is required"
            });
        }

        // Verify doctor exists
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

        // 1. Fetch UNREAD notifications
        const [notifications] = await mySqlPool.query(
            `SELECT * FROM notification 
             WHERE doctor_id = ? AND is_read = FALSE
             ORDER BY created_at DESC`,
            [doctorId]
        );

        // 2. If there are unread notifications, mark them as read
        if (notifications.length > 0) {
            const notificationIds = notifications.map(n => n.id);
            await mySqlPool.query(
                `UPDATE notification 
                 SET is_read = TRUE 
                 WHERE id IN (?)`,
                [notificationIds]
            );
        }

        // 3. Return only the newly fetched notifications (now marked as read)
        res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {
        console.error("Notification error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/* 
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
*/
exports.doctor_Notification_Controller = doctor_Notification_Controller;
 





