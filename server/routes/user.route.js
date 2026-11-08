const { signUp, login, getAllUser, getSingleUser, deleteUser, logOut, updateStatus } = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorization')

const route = require('express').Router()

route.post('/signup' , signUp)

route.post('/login' , login)

route.get('/' , getAllUser)

route.get('/:id' , getSingleUser)

route.post('/delete/:id' , deleteUser)

route.post('/logout' , logOut)

route.post('/status/:id', authorize , authenticate('admin')  , updateStatus)

module.exports = route