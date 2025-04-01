const { mySqlPool } = require("../config/db");


const Create_Patient_Table = async () => {
    try {
        
        const patientTable = await mySqlPool.query("CREATE TABLE IF NOT EXISTS patient(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, contact VARCHAR(10) NOT NULL, address VARCHAR(100) NOT NULL)")

        console.log("patientTable created successfully".bgGreen);       

    } catch (error) {
        
        console.log(`Error in Create_Patient_Table : ${error.message}`.bgRed);
    }
}

Create_Patient_Table();
