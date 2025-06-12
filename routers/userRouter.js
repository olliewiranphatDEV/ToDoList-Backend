const express = require('express')
const userRouter = express.Router()
const authorization = require('../middlewares/authorization')
const { getMyTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/userController')

// CHECK TOKEN - EVERY ROUTE
userRouter.use(authorization)

// Routes
userRouter.get('/all-todoitems', getMyTodos)
userRouter.post('/new-todoitem', createTodo)
userRouter.patch('/update-todoitem/:todoID', updateTodo)
userRouter.delete('/delete-todoitem/:todoID', deleteTodo)

module.exports = userRouter
