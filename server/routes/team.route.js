const { getAllTeam, createTeam, deleteTeam, addMemeber, allmyTicket, allmyTeamTicket } = require('../controllers/teamController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorization')

const route = require('express').Router()

route.get('/' , getAllTeam)

route.get('/myTask' , allmyTeamTicket)

route.post('/add' ,authorize ,  createTeam)

route.post('/add/member' , addMemeber)

route.delete('/delete/:id' , deleteTeam)



module.exports = route