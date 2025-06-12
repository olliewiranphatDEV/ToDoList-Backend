const express = require('express')
const userRouter = express.Router()
const authorization = require('../middlewares/authorization')
const { getMyTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/userController')

// Routes
userRouter.get('/all-todoitems', getMyTodos)
userRouter.post('/new-todoitem', authorization, createTodo)
userRouter.patch('/update-todoitem/:todoID', authorization, updateTodo)
userRouter.delete('/delete-todoitem/:todoID', authorization, deleteTodo)

module.exports = userRouter
