const mysql = require('mysql2')
const env = require('dotenv').config()

const db = mysql.createConnection({
    localAddress : "localhost",
    user : "root",
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE,
})

db.connect(err => {
    if(err){
        console.error("DatabaseConnection Error => ", err);
        return;
    }

    console.log("Database Connection Successful.");
    
})

module.exports = db