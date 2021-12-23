const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')
const userRoutes = require('./routes/userRoutes')
const path = require('path')
const PORT = process.env.PORT || 3001

require('dotenv').config()

app.use(express.urlencoded({ extended: true })); // New
app.use(express.json()); // New

// Set Views path
const viewsPath = path.join(__dirname, './views')
app.set('views', viewsPath)

// Set Public path
const publicDirPath = path.join(__dirname, './public')
app.use(express.static(publicDirPath))

// Set view engine
app.engine('hbs', exphbs({extname: 'hbs'}))
app.set('view engine', '.hbs');

app.use('', userRoutes)

app.listen(PORT, () => {console.log(`Listening to the PORT ${PORT}`)})