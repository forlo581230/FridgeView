var express = require('express');
// var User = require('../../model/user');
var fridgeSchema = require('../model/fridge');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

router.get('/getData', function (req, res, next) {
  var searchQuery = {};
  var collection = '';
  if (req.query.name)
    searchQuery = { name: req.query.name };
  if (req.query.start && req.query.mac) {

    collection = 'data_' + new moment(req.query.start).format('YYYYMMDD') + '_' + req.query.mac;

    var Fridge = mongoose.model(collection, fridgeSchema);

    Fridge.find(searchQuery, function (err, fridges) {
      if (err) {
        res.status(400);
        res.send();
      }
      console.log(fridges);
      console.log("returning all the fridges.");
      res.send(fridges);
    })
  } else {
    res.send([]);
  }

});

// router.post('/insertCar', function(req, res, next) {
//   var newCarRegister = new CarRegister(req.body);
//   newCarRegister._id = mongoose.Types.ObjectId();
// console.log(req.body);
//   newCarRegister.save(function(err) {
//     if (err) {
//       console.log("not saved!");
//       res.status(400);
//       res.send();
//     }

//     console.log("saved!");
//     res.send({ id : newCarRegister._id });
//   });
// });

// router.post('/deleteCar', function(req, res, next) {
//   CarRegister.remove({_id : req.body.id}, function(err) {
//     if (err) {
//       console.log("not removed!");
//       res.status(400);      
//       res.send();
//     }

//     console.log("removed!");
//     res.send({status: 'ok'});
//   });
// });
// router.post('/updateCar', function(req, res, next) {

//   var carRegister = new CarRegister(req.body);
//   console.log(carRegister);
//   CarRegister.update({_id : carRegister.id}, carRegister, function(err) {
//     if (err) {
//       console.log("not updated!");
//       res.status(400);      
//       res.send();
//     }

//     console.log("updated!");
//     res.send({status: 'ok'});
//   });
// });

module.exports = router;
