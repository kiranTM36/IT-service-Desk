const { signUp, login, getAllUser, getSingleUser, deleteUser, logOut, updateStatus } = require('../controllers/userController')

const route = require('express').Router()

route.post('/signup' , signUp)

route.post('/login' , login)

route.get('/' , getAllUser)

route.get('/:id' , getSingleUser)

route.post('/delete/:id' , deleteUser)

route.post('/logout' , logOut)

route.post('/status/:id' , updateStatus)

module.exports = route