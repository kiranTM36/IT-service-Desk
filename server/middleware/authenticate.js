const authenticate = (role) => {
    return (req , res , next) => {
        if(!req.user){
            return res.status(400).json({
                message : "Please login"
            })
        }

        if(req.user.role !== role){
            return res.status(400).json({
                message : "Access Denied"
            })
        }

        next()

    }
}

module.exports = authenticate