const db = require("../db")

const getAllTeam = (req , res) => {
    try {
        const sql = `
        SELECT t.*,u.username FROM team t JOIN user u ON t.createdBy = u.id
        `
        db.query(sql , (err , result) => {
            if(err){
                console.log("Error : ", err);
                return res.status(500).json({
                    message: 'Error',
                    success: false
                });
            }

            if(result.length === 0){
                return res.status(404).json({
                    message: 'No Team Found',
                    success: false
                })
            }

            res.status(200).json({
                message : "List of Team",
                success : true,
                data : result
            })
        })
    } catch (error) {
        console.error('addRole error:', error);
        return res.status(400).json({
            message: 'Error',
            success: false
        });
    }
}

const createTeam = (req , res) => {
    try {
        const createdBy = req.user.id
        const {gName , gDesc } = req.body

        const sql = `
        INSERT INTO team (gName , gDesc , createdBy) VALUES (?,?,?)
        `

        db.query(sql , [gName , gDesc , createdBy] , (err , result) => {
            if(err){
                console.log("Error : ", err);
                return res.status(500).json({
                    message: 'Error',
                    success: false
                });
            }

            res.status(200).json({
                message : "List of Team",
                success : true,
                data : result
            })
        })
    } catch (error) {
        console.error('addRole error:', error);
        return res.status(400).json({
            message: 'Error',
            success: false
        });
    }
}

const deleteTeam = (req, res) => {
    try {
        const {id} = req.params
        const sql = `
        DELETE FROM team WHERE gId=?
        `

        db.query(sql , [id] , (err , result) => {
            if(err){
                console.log("Error : ", err);
                return res.status(500).json({
                    message: 'Error',
                    success: false
                });
            }

            res.status(200).json({
                message : "Deleted Successfully",
                success : true,
                data : result
            })
        })
    } catch (error) {
        console.error('addRole error:', error);
        return res.status(400).json({
            message: 'Error',
            success: false
        });
    }
}

const addMemeber = (req, res) => {
    try {
        const { teamId, userIds } = req.body;

        if (!teamId || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({
                message: "teamId and userIds are required",
                success: false
            });
        }

        const values = userIds.map((userId) => [teamId, userId]);

        const sql = `
            INSERT INTO user_team (teamId, userId)
            VALUES ?
        `;

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to add members",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Members added successfully",
                success: true,
                affectedRows: result.affectedRows
            });
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const allmyTeamTicket = (req, res) => {
    try {
        const sql = `
            SELECT t.status as tStatus, t.id as tId ,t.*, u.* FROM ticket t JOIN user u ON u.id = t.userId WHERE t.teamId = 2
        `;

        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(200).json({
                data: result
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//SELECT t.gName, u.* FROM user_team ut JOIN team t ON t.gId = ut.teamId JOIN user u ON u.id = ut.userId WHERE ut.teamId = 1

const myTeam = (req , res) => {
    try {

        const sql = `
        SELECT * FROM team where gId=2
        `
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(200).json({
                data: result[0]
            });
        });
    } catch (error) {
        
    }
}


module.exports = { getAllTeam  , createTeam  , deleteTeam  , addMemeber , allmyTeamTicket , myTeam }