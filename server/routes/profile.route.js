const { addProfile, getProfile, updateProfile } = require('../controllers/profileController')

const route = require('express').Router()


route.get('/:id' , getProfile)

route.post('/add/:id' , addProfile)

route.patch('/update/:id' , updateProfile)


module.exports = route