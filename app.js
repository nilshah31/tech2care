var mysql = require('mysql');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var nodemailer = require('nodemailer');

global.base_dir = __dirname;
global.abs_path = function(path) {
    return base_dir + path;
};
global.include = function(file) {
    return require(abs_path('/' + file));
};

var index_controller = include('t2c-api/routes/index');

// Init App (with nodejs+express+handlebars)
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout',partialsDir: __dirname + '/views/partials/'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Connect Flash
app.use(flash());
app.use('/', index_controller);

// Set Port
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3307",
    database: "tech2care"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set('con', con);