
// Create_Notification_Table.js

const { mySqlPool } = require("../config/db");

const Create_Notification_Table = async () => {
    try {
        await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS notification (
                id INT PRIMARY KEY AUTO_INCREMENT,
                doctor_id INT NOT NULL,
                message VARCHAR(255) NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE
            )
        `);
        console.log("Notification Table Created Successfully".bgGreen);
    } catch (error) {
        console.log(`Error in Create_Notification_Table: ${error.message}`.bgRed);
    }
};

Create_Notification_Table();

