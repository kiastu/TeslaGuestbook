/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    compression = require('compression'),
    mongoose = require('mongoose'),
    multer = require('multer');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    //app.use(express.errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}
/*
 /=============Database Configuration==============/
 */
var config = require('./config/db.js');
var credentials = config.dbCredentials;
var auth = "mongodb://" + credentials.username + ":" + credentials.password + "@ds039411.mongolab.com:39411/teslaguestbook";
console.log(auth);
mongoose.connect(auth);
/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.post('/api/posts', api.post);
app.get('/api/posts', api.getPosts);
app.post('/api/uploadImage');

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
