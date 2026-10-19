const db = require("../db")

const createTicket = (req , res) => {
    try {
        const { title , cId ,userId , description , priority } = req.body

        const image = req.file ? req.file.filename : null

        const sql = `
        INSERT INTO ticket (title , cId, userId ,description ,priority, image) VALUES (?,?,?,?,?,?)
        `

        db.query(sql , [title , cId , userId, description , priority , image] , (err , result) => {
            if(err){
                console.log("Create Ticket Error : ", err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            res.status(200).json({
                message  : "Sucessfully added Ticket",
                success : true ,
                data : result
            })
        })
    } catch (error) {
        console.log("Create Ticket Error : ", err);
        return res.status(500).json({
            message : "Error",
            success : false
        })
    }
}

const getAllTicket = (req , res) => {
    try {
        const sql = `
        SELECT t.*, u.*,c.*,r.* FROM ticket t JOIN user u ON t.userId = u.id JOIN category c ON t.cId = c.id JOIN role r ON u.roleId = r.id
        `

        db.query(sql , (err , result) => {
            if(err){
                console.log("Create Ticket Error : ", err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "No Ticket Found",
                    success : false
                })
            }

            return res.status(200).json({
                message : "List of Ticket",
                success : true,
                data  : result
            })
        })
    } catch (error) {
        console.log("GET All Ticket Error : ", err);
        return res.status(500).json({
            message : "Error",
            success : false
        })
    }
}

const getSingleTicket = (req , res) => {
    try {
        const {id} = req.params
        const sql = `
        SELECT t.*, u.*,c.*,r.* FROM ticket t JOIN user u ON t.userId = u.id JOIN category c ON t.cId = c.id JOIN role r ON u.roleId = r.id WHERE t.id=?
        `

        db.query(sql ,[id], (err , result) => {
            if(err){
                console.log("Create Ticket Error : ", err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "No Ticket Found",
                    success : false
                })
            }

            return res.status(200).json({
                message : "Ticket Found",
                success : true,
                data  : result
            })
        })
    } catch (error) {
        console.log("GET All Ticket Error : ", err);
        return res.status(500).json({
            message : "Error",
            success : false
        })
    }
}

const deleteTicket = (req , res )  => {
    try {
        const  {id} = req.params

        const sql = `
        DELETE FROM ticket WHERE id=?
        `

        db.query(sql , [id] , (err , result) => {
            if(err){
                console.log("Delete Ticket Error : ", err);
                return res.status(500).json({
                    message : "Error",
                    success : false
                })
            }

            if(result.affectedRows === 0){
                return res.status(404).json({
                    message : "No Ticket Found",
                    success : false
                })
            }

            return res.status(200).json({
                message : "Ticket Delted",
                success : true,
                data  : result
            })
        })
    } catch (error) {
        console.log("Delete Ticket Error : ", err);
        return res.status(500).json({
            message : "Error",
            success : false
        })
    }
}

// const updateTicket = (req , res) => {
//     try {
//         const
//     } catch (error) {
        
//     }
// }

module.exports = {
    createTicket , getAllTicket , getSingleTicket , deleteTicket
}