const db = require("../db");

const createTeamTable = () => {

   const sql = `
    CREATE TABLE IF NOT EXISTS team (
        gId INT PRIMARY KEY AUTO_INCREMENT,
        gName VARCHAR(50) NOT NULL UNIQUE,
        gDesc TEXT,
        createdBy INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (createdBy) REFERENCES user(id)
    )
   `

   db.query(sql , err => {
    if (err) {
            console.error("Support Team Error => ", err);
            return
        }
        console.log("Support Team table created Successfully");
   })
}

module.exports = createTeamTable