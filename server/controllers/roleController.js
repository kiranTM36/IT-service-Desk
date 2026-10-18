const db = require("../db");

const addRole = (req, res) => {
    try {
        const { name } = req.body;
        const sql = `INSERT INTO role (name) VALUES (?)`;

        db.query(sql, [name], (err, result) => {
            if (err) {
                console.error('getRole error:', err);
                return res.status(400).json({
                    message: 'Error',
                    success: false
                });
            }
            res.status(200).json({
                message: 'New Role Added',
                success: true,
                data: result
            });
        });
    } catch (error) {
        console.error('addRole error:', error);
        return res.status(400).json({
            message: 'Error',
            success: false
        });
    }
};

const getRole = (req, res) => {
    try {
        const sql = `
            SELECT * FROM role
        `

        db.query(sql, (err, result) => {
            if (err) {
                console.error("getRole error : ", err);
                return res.status(400).json({
                    message: "Error",
                    success: false
                })
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "No Role",
                    success: false
                })
            }

            res.status(200).json({
                result: result,
                success: true
            })
        })

    } catch (error) {
        console.error("getRole error : ", error);
        return res.status(400).json({
            message: "Error",
            success: false
        })
    }
}

const deleteRole = (req , res) => {
    try {
        const {id} = req.params
        
        const sql = `DELETE FROM role WHERE id=?`;

        db.query(sql ,[id], (err ,result) => {
            if (err) {
                console.error("DeleteRole error : ", err);
                return res.status(400).json({
                    message: "Error",
                    success: false
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Role  Not found",
                    success: false
                })
            }

            res.status(200).json({
                result: result,
                success: true
            })
        })
            
    } catch (error) {
        console.error("deleteRole error : ", error);
        return res.status(500).json({
            message: "Error",
            success: false
        })
    }
}

module.exports = { addRole , getRole , deleteRole }