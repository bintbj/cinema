var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
//var mongoStore = require('connect-mongo')(express)

var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/imooc'
mongoose.connect(dbUrl)

app.set('views','./app/views/pages')//设置视图根目录
app.set('view engine', 'jade')//设置默认的模板引擎
//app.use(express.bodyParser())
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var cookieParser = require('cookie-Parser')
app.use(cookieParser())

var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}))
//app.use(express.cookieParser())
//app.use(express.session({
//	secret: 'imooc'
//}))

var logger = require('morgan')

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/routes')(app)

app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('imooc started on port' + port)

