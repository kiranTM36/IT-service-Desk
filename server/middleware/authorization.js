const jwt = require('jsonwebtoken');
const db = require('../db');

const authorize = (req , res , next) => {
    try {
        const token = req.cookies('token')

        if(!token){
            console.log("Please Login");
            return res.status(401).json({
                message : "Please Login"
            })
        }

        const user = jwt.verify(token , "key")

        const sql = `
            SELECT * FROM user WHERE email=?
        `

        db.query(sql , [user.email] , (err , result) => {
            if(err){
                console.log("Invalid Token");
                return res.status(400).json({
                    message : "Expired Token"
                })
            }
        })

        req.user = user

        next()

    } catch (error) {
        console.error("Authorization failed => ", error);
            return res.status(500).json({
                message : "Authorization failed"
        })
    }
}

module.exports = authorize