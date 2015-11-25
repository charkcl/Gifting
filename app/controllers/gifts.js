var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var Gift     = require('../models/gift');
var passport = require('passport');
var bodyParser   = require('body-parser');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/gifts', function (req, res, next) {
  res.render('gift/index');
});

router.get('/gifts/:id', function (req, res, next) {
  var giftId = req.params.id;
  res.render('gift/show', { giftId });
});