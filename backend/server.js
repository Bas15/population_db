const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

connectDB()

const app = express(); 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

 app.use('/api/user', require('./routes/userRoutes'))
  
app.listen(port, () => {console.log(`server now runing on port ${port}`)})