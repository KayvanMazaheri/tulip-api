const path = require('path')

const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth')
const indexRouter = require('./routes')
const storyRouter = require('./routes/story')

mongoose.connect('mongodb://127.0.0.1:27017/tehran', { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
  console.log('we\'re connected!')
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', authRoutes)
app.use('/', indexRouter)
app.use('/stories', storyRouter)

// use sessions for tracking logins
const MongoStore = connectMongo(session)
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
