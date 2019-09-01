require('./models/User')
require('./models/Track')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const trackRoutes = require('./routes/trackRoutes')
const mongoUri = 'mongodb+srv://root:1234!QAZ@cluster0-f65yy.mongodb.net/test?retryWrites=true&w=majority'
const requireAuth = require('./middleware/requireAuth')

const app = express()
 
app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})

 
mongoose.connection.on('connected', () => {
    console.log('mongo connected')
})

mongoose.connection.on('error', (err) => {
    console.error('mongo error', err)
})
app.get('/', requireAuth, (req, res) => {
    res.send(`your email is ${req.user.email}`)    

})

app.listen(3000, () => {
    console.log('listen on 3000')
})