
// Create_Slote_Table.js

const { mySqlPool } = require("../config/db");

const Create_Slote_Table = async () => {
    try {
        const createSlote = await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS slote (
                id INT PRIMARY KEY AUTO_INCREMENT,
                start_time TIME NOT NULL DEFAULT '11:00:00',
                end_time TIME NOT NULL DEFAULT '20:00:00',
                status VARCHAR(50),
                doctor_id INT,
                FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE
            )
        `);

        console.log("Slote Table Created Successfully".bgGreen);

    } catch (error) {
        console.log(`Error in Create_Slote_Table : ${error.message}`.bgRed);
    }
};

Create_Slote_Table();
