const express = require('express')
const app = express()
const dotenv = require('dotenv')
const ecomRouter = require('./routes/ecomAuthRoutes')
const cors = require('cors')

dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/',ecomRouter)

app.listen(3000,()=>{
    console.log('auth server running at 3000')
})