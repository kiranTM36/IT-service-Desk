const db = require("../db");

const addCategory = (req, res) => {
    try {

        const {
            name
        } = req.body

        const sql = `
        INSERT INTO category (cName) VALUES (?)
        `

        db.query(sql, [name], (err, result) => {
            if (err) {
                console.log("addCategory error : ", err);
                return res.status(500).json({
                    message: "error",
                    success: false
                })
            }

            res.status(200).json({
                message: "Successfully added new Category",
                success: true,
                data: result
            })
        })
    } catch (error) {
        console.log("add Category error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const getAllCategory = (req, res) => {
    try {
        const sql = `
        SELECT * FROM category
        `

        db.query(sql, (err, result) => {
            if (err) {
                console.log("getAllCategory error:", error);

                return res.status(500).json({
                    message: "Internal server error",
                    success: false
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "No CAtegory Added",
                    success: false
                })
            }

            res.status(200).json({
                message: "List of Category",
                success: true,
                data: result
            })
        })
    } catch (error) {
        console.log("add Category error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const deleteCategory = (req, res) => {
    try {
        const {
            id
        } = req.params

        const sql = `
        DELETE FROM category WHERE id=?
        `

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.log("Delete Category error:", error);

                return res.status(500).json({
                    message: "Internal server error",
                    success: false
                });
            }

            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "No category Found",
                    success: false,
                })
            }

            res.status(200).json({
                message : "category Deleted",
                success : true ,
                data : result
            })
        })
    } catch (error) {
        console.log("Delete Category error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    addCategory, getAllCategory , deleteCategory
}