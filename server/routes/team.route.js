const { getAllTeam, createTeam, deleteTeam, addMemeber } = require('../controllers/teamController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorization')

const route = require('express').Router()

route.get('/' , getAllTeam)

route.post('/add' ,authorize ,  createTeam)

route.post('/add/member' , addMemeber)

route.delete('/delete/:id' , deleteTeam)



module.exports = route