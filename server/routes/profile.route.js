const { addProfile, getProfile, updateProfile } = require('../controllers/profileController')

const route = require('express').Router()


route.get('/:id' , getProfile)

route.post('/add' , addProfile)

route.patch('/update/:id' , updateProfile)


module.exports = route