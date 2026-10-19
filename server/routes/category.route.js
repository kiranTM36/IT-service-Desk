const { addCategory, getAllCategory, deleteCategory } = require('../controllers/categoryController')

const route = require('express').Router()

route.post('/add' , addCategory)

route.get('/' , getAllCategory)

route.delete('/delete/:id' , deleteCategory)

module.exports = route