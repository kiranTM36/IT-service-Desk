const db = require('../db.js')

const createRoleTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20)
    )
`
    db.query(sql, (err) => {
        if (err) {
            console.error("Role Error => ", err);
            return
        }
        console.log("Role table created Successfully");
    })
}

module.exports = createRoleTable