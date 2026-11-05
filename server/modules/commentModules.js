const db = require("../db");

const createCommentTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS comment (
        cmtId INT PRIMARY KEY AUTO_INCREMENT,
        userId INT,
        ticketId INT,
        comment TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (userID) REFERENCES user(id),
        FOREIGN KEY (ticketId) REFERENCES ticket(id)
        )
    `

    db.query(sql , (err) => {
        if(err){
            console.error("comment Error => ", err);
            return
        }
        console.log("comment table created Successfully");
    })
}

module.exports = createCommentTable