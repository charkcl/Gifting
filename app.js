require('dotenv').load();
var express  = require('express');
var config   = require('./config/config');
var glob     = require('glob');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
// var ig = require('instagram-node').instagram();

// MongoDB Setup
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

// Require all the models in our app
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

// App Initialization
var app = express();
require('./config/express')(app, config);

// //Instagram
// ig.use({
//   client_id: process.env.INSTAGRAM_API_KEY,
//   client_secret: process.env.INSTAGRAM_API_SECRET
// });

// Server Start :)
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
