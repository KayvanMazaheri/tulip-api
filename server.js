const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const indexRouter = require('./routes')
const storyRouter = require('./routes/story')

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tehran', { useNewUrlParser: true })
const db = mongoose.connection
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	// we're connected!
})

const app = express()

app.set('view engine', 'ejs')

app.use('/static', express.static('public'))

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }))

const MongoStore = connectMongo(session)

//use sessions for tracking logins
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	},
	store: new MongoStore({
		mongooseConnection: db
	})
}))

app.use('/auth', authRoutes)
app.use('/', indexRouter)
app.use('/stories', storyRouter)

app.listen(3000, () => console.log('server listening on 3000'))
