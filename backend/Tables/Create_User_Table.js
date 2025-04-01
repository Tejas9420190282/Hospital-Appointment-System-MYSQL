const { mySqlPool } = require("../config/db");

const create_User_Table = async () => {

    try {
        
        const userTable = await mySqlPool.query("CREATE TABLE IF NOT EXISTS user(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(45), email VARCHAR(45), password VARCHAR(15))");

        console.log(`userTable Created Successfully`.bgBlack);   

    } catch (error) {
        
        console.log(`Error in create_User_Table : ${error.message}`.bgRed);   
    }
}

create_User_Table();