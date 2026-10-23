const { getAllTeam, createTeam, deleteTeam, addMemeber } = require('../controllers/teamController')

const route = require('express').Router()

route.get('/' , getAllTeam)

route.post('/add' , createTeam)

route.post('/add/member' , addMemeber)

route.delete('/delete/:id' , deleteTeam)



module.exports = route