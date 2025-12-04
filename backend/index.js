require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors ({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join('uploads')))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

app.use((req,res) => res.status(404).json({message:'ปิดปรับปรุง!!'}))

app.listen(7000 , () => console.log('Server Run Port 7000'))