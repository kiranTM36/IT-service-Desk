const { createTicket, getAllTicket, getSingleTicket, deleteTicket, getMyTicket } = require('../controllers/ticketController')
const authorize = require('../middleware/authorization')
const authenticate = require('../middleware/authenticate')
const uploads = require('../middleware/multer')
const route = require('express').Router()

route.post('/add' ,authorize,uploads.single('image'), createTicket)

route.get('/' , getAllTicket)

route.get('/my-tickets' , authorize, getMyTicket)

route.get('/:id' , getSingleTicket)

route.delete('/delete/:id' , deleteTicket)

module.exports = route