const db = require("../db");

const createProfile = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS profile (
      pId INT PRIMARY KEY AUTO_INCREMENT,
      address VARCHAR(255),
      phone VARCHAR(20),
      bio TEXT,
      userId INT,
      
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error("Profile Error => ", err);
      return;
    }
    console.log("Profile table created successfully");
  });
};

module.exports = createProfile;
