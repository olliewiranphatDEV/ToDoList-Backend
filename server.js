const express = require('express');
const notFoundPath = require('./middlewares/notFoundPath');
const errorHandler = require('./middlewares/errorHandler');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8083
const cors = require('cors')
const morgan = require('morgan');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');


app.get("/", (req, res) => {
    res.send("API is working!");
});

///// Connect Frontend - Backend :
app.use(cors());


///// Read JSON req.body from Frontend :
app.use(express.json({ limit: "10mb" })) //Max Payload size Server can receive
app.use(morgan('dev'))


// ROUTER API ENDPOINT
app.use('/auth', authRouter)
app.use('/user', userRouter)

// NOT FOUND API PATH
app.use(notFoundPath)

// SUPPORT ERROR
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on PORT ${port}`))