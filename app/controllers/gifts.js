var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var Gift     = require('../models/gift');
var passport = require('passport');
var methodOverride = require('method-override');

module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next){
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    console.log("authenticated")
    return next();
  } else {
    console.log("not authenticated")
    return res.status(401).json({message: "Please Login"});
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

router.get('/gifts/:id/edit', function (req, res, next) {
  var giftId = req.params.id;
  res.render('gift/edit', { giftId });
});

router.get('/gifts/:id/delete', authenticatedUser, function (req, res, next) {
  console.log(req.user.id);
  console.log(req.params.id);
  var currentUser = req.user.id;
  var giftId = req.params.id;

  Gift.findById(giftId, function(err, gift){
    if (err) res.json({message : err});
    if (currentUser != gift.createdBy){
      res.status(401).json({message:"LOSER"})
    } else {
      gift.remove(function(err){
        if(err) res.json({message:err})
      res.render('gift/index');
      })
    }
  })
});

