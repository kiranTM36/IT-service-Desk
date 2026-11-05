const { createComment, getComment } = require('../controllers/commentController')
const authorize = require('../middleware/authorization')

const route = require('express').Router()

route.post('/add' , authorize , createComment)

route.get('/:id' , authorize , getComment)

module.exports = route