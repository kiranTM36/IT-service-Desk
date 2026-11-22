const db = require("../db")

const addProfile = (req , res) => {
    try {
        const {address , phone , bio } = req.body
        const {id} = req.params

        const sql = `
        INSERT INTO profile (address,phone,bio,userId) VALUES (?,?,?,?)
        `

        db.query(sql , [address , phone , bio , id] , (err , result) => {
            if(err){
                return res.status(500).json({
                    message : "Unsuccessfully",
                    success : false
                })
            }
            res.status(200).json({
                message : "Profile Inserted Successfully",
                success : true
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message" : "Error"
        })
        
    }
}

const getProfile = (req , res) => {
    try {
        const {id} = req.params
        const sql = 'SELECT p.* From profile p WHERE p.userId = ?'

        db.query(sql ,[id], (err , result) => {
            if(err){
                return res.status(500).json({
                    message : "Unsuccessfully",
                    success : false
                })
            }
            if(result.length === 0){
                return res.status(404).json({
                    message : "NO user Found",
                    success : false
                })
            }
            res.status(200).json({
                message : "Profile Inserted Successfully",
                success : true,
                data : result[0]
            })
        })
    } catch (error) {
        
    }

}

const updateProfile = (req , res)=> {
    try {
        const {id} = req.params

        const {address , phone , bio } = req.body

        const sql = `
            UPDATE profile SET phone = COALESCE(?, phone) , bio = COALESCE (? , bio) , address = COALESCE (? , address) WHERE userId = ?
        `

        db.query(sql , [phone ?? null , bio ?? null , address ?? null , id] , (err , result) => {
            if(err){
                return res.status(500).json({
                    message : "Unsuccessfully",
                    success : false
                })
            }
            if(result.affectedRows === 0){
                return res.status(404).json({
                    message : "NO user Found",
                    success : false
                })
            }
            res.status(200).json({
                message : "Profile Updated  Successfully",
                success : true,
                data : result[0]
            })
        })
    } catch (error) {
        
    }
}

module.exports = {addProfile , getProfile , updateProfile}