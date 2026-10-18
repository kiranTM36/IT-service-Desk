const { addRole, getRole, deleteRole } = require('../controllers/roleController')

const route = require('express').Router()

route.post('/add' , addRole) 

route.get('/' , getRole)

route.delete('/delete/:id' , deleteRole)

module.exports = route