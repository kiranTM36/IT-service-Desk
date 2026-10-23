const db = require("../db");

const createUserteamTable = () => {

   const sql = `
    CREATE TABLE IF NOT EXISTS user_team (
    userId INT NOT NULL,
    teamId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (userId, teamId),

    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (teamId) REFERENCES team(gId)
);
   `

   db.query(sql , err => {
    if (err) {
            console.error("user Team Error => ", err);
            return
        }
        console.log("uesr Team table created Successfully");
   })
}

module.exports = createUserteamTable