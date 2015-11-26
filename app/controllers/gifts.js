var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var Gift     = require('../models/gift');
var passport = require('passport');
var methodOverride = require('method-override');

function authenticatedUser(req, res, next){
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    console.log("Gift authenticated")
    return next();
  } else {
    console.log("Gift not authenticated")
    return res.status(401).redirect('/signin');
  }
}

router.get('/gifts', function (req, res, next) {
  res.render('gift/index');
});

router.get('/gifts/new', authenticatedUser, function (req, res) {
  res.render('gift/new');
});

router.get('/gifts/:id', function (req, res, next) {
  var giftId = req.params.id;
  res.render('gift/show', { giftId });
});

router.get('/gifts/:id/edit', authenticatedUser, function (req, res, next) {
  var giftId = req.params.id;
  res.render('gift/edit', { giftId });
});

module.exports = function (app) {
  app.use('/', router);
};
