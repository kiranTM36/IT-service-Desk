const db = require('../db')

const createUserTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL, 
    roleId INT DEFAULT 3,
    password  VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT 1 ,
    profile VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    createdAt DATETIME DEFAULT CURRENT_DATE,

    FOREIGN KEY (roleId) REFERENCES  role(id)
    )
`

    db.query(sql, (err) => {
        if (err) {
            console.error("User Error => ", err);
            return
        }
        console.log("user table created Successfully");
    })
}

module.exports = createUserTable