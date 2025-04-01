
// Create_Doctor_Table.js

const { mySqlPool } = require("../config/db");

const Create_Doctor_Table = async () => {
    try {
        const doctorTable = await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS doctor (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                name VARCHAR(45) NOT NULL, 
                contact VARCHAR(11) NOT NULL, 
                doctor_type VARCHAR(25) NOT NULL, 
                education VARCHAR(100) NOT NULL, 
                education_place VARCHAR(100) NOT NULL, 
                experience VARCHAR(50) NOT NULL, 
                about VARCHAR(1000) NOT NULL, 
                fees VARCHAR(30) NOT NULL, 
                img VARCHAR(1000), 
                patient_id INT,
                FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE
            )
        `);

        console.log("Doctor Table Created Successfully".bgGreen);

    } catch (error) {
        console.log(`Error in Create_Doctor_Table: ${error.message}`.bgRed);
    }
};

Create_Doctor_Table();
