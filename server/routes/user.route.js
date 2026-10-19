const { signUp, login, getAllUser, getSingleUser, deleteUser } = require('../controllers/userController')

const route = require('express').Router()

route.post('/signup' , signUp)

route.post('/login' , login)

route.get('/' , getAllUser)

route.get('/:id' , getSingleUser)

route.post('/delete/:id' , deleteUser)

module.exports = route