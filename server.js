require('dotenv').config()
 
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')


app.use(cors())

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

mongoose.connect(DB, {useNewUrlParser: true})
const db =mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json())

const stackBlogRouter = require('./routes/stackblog')
app.use('/stackBlog', stackBlogRouter)

app.listen(3000, ()=> console.log('Server has started'))