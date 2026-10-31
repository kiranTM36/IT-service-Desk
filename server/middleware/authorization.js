const jwt = require('jsonwebtoken');
const db = require('../db');

const authorize = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const sql = `SELECT id, email, roleId FROM user WHERE email = ?`;

        db.query(sql, [decoded.email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "User Not Found"
                });
            }

            req.user = result[0];

            next();
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = authorize;