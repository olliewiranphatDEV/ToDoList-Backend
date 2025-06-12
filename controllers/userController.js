const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('../utils/createError')
const TryCatch = require('../utils/TryCatch')


// GET ALL TODO-ITEMS WITH PAGINATION
exports.getMyTodos = TryCatch(async (req, res) => {
    const userID = req.user.userID
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const total = await prisma.todo.count({
        where: { userID }
    })

    const todoItems = await prisma.todo.findMany({
        where: { userID },
        orderBy: [
            { status: "asc" }, // WORKING --> COMPLETED
            { updatedAt: "desc" },
            { updatedAt: "desc" }
        ],
        skip,
        take: limit
    })

    res.status(200).json({
        status: "SUCCESS",
        results: {
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            todoItems
        }
    })
})

// CREATE NEW TODO-ITEM
exports.createTodo = TryCatch(async (req, res) => {
    const { title } = req.body
    if (!title) throw createError(400, "Title is required")

    const todo = await prisma.todo.create({
        data: {
            title,
            userID: req.user.userID
        }
    })

    res.status(201).json({ status: "SUCCESS", todo })
})

// UPDATE TODO-ITEM BY todoID (TITLE/COMPLETED)
exports.updateTodo = TryCatch(async (req, res) => {
    console.log("req.body", req.body)

    const { todoID } = req.params
    const { title, status } = req.body


    const todo = await prisma.todo.findUnique({ where: { todoID: Number(todoID) } })
    if (!todo || todo.userID !== req.user.userID) {
        throw createError(404, "Todo not found or unauthorized")
    }

    const updated = await prisma.todo.update({
        where: { todoID: Number(todoID) },
        data: {
            ...(title && { title }),
            ...(status && { status }),
        }
    })

    res.status(200).json({ status: "SUCCESS", results: updated })
})


// DELETE TODO-ITEM BY todoID
exports.deleteTodo = TryCatch(async (req, res) => {
    const { todoID } = req.params
    console.log('deleteTodo todoID >>', todoID);


    const todo = await prisma.todo.findUnique({ where: { todoID: Number(todoID) } })
    if (!todo || todo.userID !== req.user.userID) {
        throw createError(404, "Todo not found or unauthorized")
    }

    await prisma.todo.delete({ where: { todoID: Number(todoID) } })

    res.status(200).json({ status: "SUCCESS", message: `Todo deleted ${todoID}` })
})
