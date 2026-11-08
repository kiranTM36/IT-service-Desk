const authenticate = (role) => {
    return (req , res , next) => {
        if(!req.user){
            return res.status(400).json({
                message : "Please login"
            })
        }

        if(req.user.name !== role){
            return res.status(400).json({
                message : "Access Denied"
            })
        }

        next()

    }
}

module.exports = authenticate