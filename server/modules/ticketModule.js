const db = require('../db')

const createTicketTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ticket (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT,
        teamId INT NULL,
        title VARCHAR(50) NOT NULL,
        cId INT,
        description TEXT,
        priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
        status BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        image VARCHAR(255),

        FOREIGN KEY (cId) REFERENCES category(id),
        FOREIGN KEY (userId) REFERENCES user(id),
        FOREIGN KEY (teamId) REFERENCES team(gId)
            ON DELETE SET NULL
            ON UPDATE CASCADE
    )
`;
    db.query(sql, (err) => {
        if (err) {
            console.error("ticket Error => ", err);
            return
        }
        console.log("ticket table created Successfully");
    })
}

module.exports = createTicketTable