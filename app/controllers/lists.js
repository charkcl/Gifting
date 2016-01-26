var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var Gift     = require('../models/gift');
var List     = require('../models/list');
var passport = require('passport');
var methodOverride = require('method-override');


function authenticatedUser(req, res, next){
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    console.log("List authenticated")
    return next();
  } else {
    console.log("List not authenticated")
    return res.status(401).redirect('/signin');
  }
}

router.get('/mylist', authenticatedUser, function (req, res, next) {
  var currentUser = req.user.id;
  res.render('list/index');
});

router.get('/mylist/:id/delete', authenticatedUser, function (req, res, next) {

  var currentUser = req.user.id;
  var listId = req.params.id;

  List.findById(listId, function(err, list){
    if (err) res.json({message : err});
    if (currentUser != list.user){
      res.status(401).json({message:"LIST LOSER"})
    } else {
      list.remove(function(err){
        if(err) res.json({message:err})
      res.redirect('/mylist');
      })
    }
  })
});

module.exports = function (app) {
  app.use('/', router);
};
