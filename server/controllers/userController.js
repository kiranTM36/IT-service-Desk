const db = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signUp = (req, res) => {
    try {
        const {username,email,password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
                success: false
            });
        }

        const genSalt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, genSalt)

        const sql = `
            INSERT INTO users (username , email  , password) VALUES (?,?,?)
        `

        db.query(sql, [username, email, hashPassword], (err, result) => {
            if (err) {
                console.log("signup error : ", err);
                return res.status(400).json({
                    message: "error",
                    success: false
                })
            }

            res.status(200).json({
                message: "Signup Success",
                success: true,
                data : {
                    id : result.insertId,
                    email : email,
                    password : password
                }
            })
        })
    } catch (error) {
        console.log("signup error : ", error);
        res.status(400).json({
            message: "error",
            success: false
        })
    }
}

const login = (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "PLease Enter credentials"
            })
        }

        const sql = `
            SELECT * FROM users WHERE email=?
        `

        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log("login error : ", err);
                return res.status(400).json({
                    message: "error",
                    success: false
                })
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password",
                    success: false
                });
            }

            const isMatch = bcrypt.compareSync(password, result[0].password)

            if (!isMatch) {
                console.log("Invalid Password");
                return res.status(400).json({
                    message: "error",
                    success: false
                })
            }

            const token = jwt.sign({
                id: result[0].id,
                email: result[0].email,
                role: result[0].role
            }, process.env.JWT_KEY, {
                expiresIn: '30d'
            })

            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.status(200).json({
                message: "Login Success",
                success: true,
                token: token,
                data: {
                    id: result[0].id,
                    email: result[0].email,
                    role: result[0].role
                }
            })


        })
    } catch (error) {
        console.log("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    signUp , login
}