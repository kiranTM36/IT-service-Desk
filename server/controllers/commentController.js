const db = require("../db")

const createComment = (req, res) => {
    try {
        const { ticketId , comment} = req.body
        const userId = req.user.id
        
        const sql = `
        INSERT INTO comment (ticketId , userId ,comment) VALUES (?,?,?)
        `
        db.query(sql , [ticketId , userId , comment] , (err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            res.status(200).json({
                message : "Comment Stored Successfully",
                success : true
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Error",
            success : false
        })
    }
}

const getComment = (req , res) => {
    try {
        const {id} = req.params

        const sql = `
        SELECT c.*, u.* FROM comment c JOIN user u ON c.userId = u.id WHERE ticketId = ?
        `

        db.query(sql , [id] , (err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            res.status(200).json({
                message : "Comments",
                data : result,
                success : true
            })
        })
        
    } catch (error) {
        
    }
}

module.exports = {createComment , getComment}