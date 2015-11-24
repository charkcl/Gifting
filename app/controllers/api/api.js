var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Gift = require('../../models/gift');
var List = require('../../models/list');

module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({message: "Please Login"});
  }
}

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.json({message : "secret"});
});

// Gift-index
router.get('/api/gifts', function(req, res, next) {
  Gift.find({}, function(err, gifts){
    if (err) res.json({message : err})
    res.json({gifts : gifts});
  })
});

//Gift-show
router.get('/api/gifts/:id', function(req, res, next) {
  var giftId = req.params.id;

  Gift.findById(giftId, function (err,gift){
    if (err) res.json({message : err})
    res.json({gift : gift});
  })
});

// Gift-create
router.post("/api/gifts", authenticatedUser, function(req, res){
  var giftParams = req.body.gift;
  giftParams.createdBy = req.user._id;

  Gift.create(giftParams, function (err, gift) {
    if (err) res.json({message : err})
    res.json({gift : gift})
  });
})

//Gift-edit
router.put('/api/gifts/:id', authenticatedUser, function(req, res, next) {

  var currentUser = req.user.id;
  var giftId = req.params.id;

  Gift.findById(giftId, function (err , gift){
    if (err) res.json({message : err})
    if (currentUser !=  gift.createdBy) {
      res.json({message: "You are not the creator!"});
    } else {
    if (req.body.gift.name) gift.name = req.body.gift.name;
    if (req.body.gift.shop) gift.shop = req.body.gift.shop;
    if (req.body.gift.description) gift.description = req.body.gift.description;
    if (req.body.gift.tags) gift.tags = req.body.gift.tags;

    gift.save(function(err){
      if (err) res.json({message : err});
      res.json({gift : gift});
      })
    }
  })
})
//Gift-destroy
router.delete('/api/gifts/:id', authenticatedUser, function(req, res, next){

  var currentUser = req.user.id;
  var giftId = req.params.id;

  Gift.findById(giftId, function (err , gift){
    if (err) res.json({message : err})
    if (currentUser !=  gift.createdBy) {
      res.json({message: "You are not the creator!"});
    } else {
      // Gift.findByIdAndRemove(giftId, function(err){
      gift.remove(function(err){
      if (err) res.json({message: err})
      res.json({message: "Gift has been removed"})
      });
    }
  })
})

//List-get
// router.get('/api/mylist', function(req, res, next) {
//   var currentUser = "";

//   List.find({}, function(err, lists){
//     if (err) res.json({message : err})
//     res.json({lists : lists});
//   })
// });

  //List-post

  //List-delete