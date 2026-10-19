const { createTicket, getAllTicket, getSingleTicket, deleteTicket } = require('../controllers/ticketController')
const uploads = require('../middleware/multer')
const route = require('express').Router()

route.post('/add' ,uploads.single('image'), createTicket)

route.get('/' , getAllTicket)

route.get('/:id' , getSingleTicket)

route.delete('/delete/:id' , deleteTicket)

module.exports = route