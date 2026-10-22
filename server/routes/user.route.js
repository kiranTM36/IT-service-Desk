const { signUp, login, getAllUser, getSingleUser, deleteUser, logOut } = require('../controllers/userController')

const route = require('express').Router()

route.post('/signup' , signUp)

route.post('/login' , login)

route.get('/' , getAllUser)

route.get('/:id' , getSingleUser)

route.post('/delete/:id' , deleteUser)

route.post('/logout' , logOut)

module.exports = route