const db = require('../db')

const createCategoryTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cName VARCHAR(30)
    )
`
    db.query(sql, (err) => {
        if (err) {
            console.error("Category Error => ", err);
            return
        }
        console.log("Category table created Successfully");
    })
}

module.exports = createCategoryTable