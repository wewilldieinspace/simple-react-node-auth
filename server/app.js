const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 8000

app.use('/api/auth', require('./routes/auth.routes'))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`)
})

