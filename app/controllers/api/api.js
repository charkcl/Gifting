var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Gift = require('../../models/gift');
var List = require('../../models/list');

module.exports = function (app){
  app.use('/', router);
};

function authenticatedUser(req, res, next){
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    console.log("API authenticated")
    return next();
  } else {
    console.log("API not authenticated")
    return res.status(401).json({message: "Please Login"});
  }
}

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.status(200).json({message : "secret"});
});

// Gift-index
router.get('/api/gifts', function(req, res, next){
  Gift.find({}).select('-createdBy').exec(function(err, gifts){
    if (err) res.status(400).json({success: false, message : err})

    res.status(200).json({gifts});
  })
});

//Gift-show
router.get('/api/gifts/:id', function(req, res, next) {
  var giftId = req.params.id;

  Gift.findById(giftId).select('-createdBy').exec(function (err,gift){
    if (err) res.status(400).json({message : err})
    res.json({gift});
  })
});

// Gift-create
router.post("/api/gifts", authenticatedUser, function(req, res){
  var giftParams = req.body.gift;
  giftParams.createdBy = req.user._id;

  Gift.create(giftParams, function (err, gift){
    if (err) res.status(400).json({message : err})
    res.status(201).json(gift)
  });
})

//Gift-edit
router.put('/api/gifts/:id', authenticatedUser, function(req, res, next){

  var currentUser = req.user.id;
  var giftId      = req.params.id;

  Gift.findById(giftId, function (err , gift){
    if (err) res.status(400).json({message : err})
    if (currentUser !=  gift.createdBy){
      res.status(401).json({message: "You are not the creator!"});
    } else {
    var reqGift = req.body.gift;

    if (reqGift.name)          gift.name        = reqGift.name;
    if (reqGift.shop)          gift.shop        = reqGift.shop;
    if (reqGift.description)   gift.description = reqGift.description;
    if (reqGift.tags)          gift.tags        = reqGift.tags;

    gift.save(function(err){
      if (err) res.status(400).json({message : err});
      res.json({gift});
      })
    }
  })
})
//Gift-destroy
router.delete('/api/gifts/:id', authenticatedUser, function(req, res, next){

  var currentUser = req.user.id;
  var giftId = req.params.id;

  Gift.findById(giftId, function (err , gift){
    if (err) res.status(400).json({message : err});
    if (currentUser != gift.createdBy){
      res.status(401).json({message: "You are not the creator!"});
    } else {
      gift.remove(function(err){
        if (err) res.json({message: err})
        res.status(200).json({message: "Gift has been removed"});
      });
    }
  })
})

//List-get api/mylist
router.get('/api/mylist', authenticatedUser, function(req, res, next){

  var currentUser = req.user.id;

  List.find({user: currentUser}, function(err, lists){
    if (err) res.status(400).json({message : err})
    res.status(200).json({lists : lists});
  })
});

//List-post api/mylist
router.post('/api/mylist', authenticatedUser, function(req, res){

  var listParams = req.body.list;
  listParams.user = req.user._id;
  listParams.gift = req.params.id;

  List.create(listParams, function(err, list){
    if (err) res.status(400).json({message : err})
    res.status(201).json({list : list});
  })
});

//List-delete api/mylist/:id
router.delete('/api/mylist/:id', authenticatedUser, function(req, res, next){

  var currentUser = req.user.id;
  var listId = req.params.id;

  List.findById(listId, function (err , list){
    if (err) res.status(400).json({message : err})
    if (currentUser != list.user){
      res.status(401).json({message: "You are not authorized"});
    } else {
      list.remove(function(err){
      if (err) res.status(400).json({message: err})
      res.json({message: "Favourite has been removed"})
      });
    }
  })
})