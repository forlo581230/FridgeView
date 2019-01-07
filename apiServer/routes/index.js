var express = require('express');
// var User = require('../../model/user');
var fridgeSchema = require('../model/fridge');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

router.get('/getJobNumbers', function (req, res, next) {
  var searchQuery = {};
  var collection = '';
  // if (req.query.reader_mac)
  //   searchQuery = { name: req.query.name };
  if (req.query.currentTime && req.query.reader_mac) {

    collection = 'list_' + new moment(req.query.startTime).format('YYYYMMDD') + '_' + req.query.reader_mac;

    var FridgeList = mongoose.model(collection, fridgeSchema);
    FridgeList.find(searchQuery, function (err, fridges) {
      if (err) {
        res.status(400);
        res.send();
      }
      console.log(fridges);
      console.log("returning all the jobs.");
      res.send(fridges);
    })
  }
  else {
    res.send([]);
  }
});

function getSectionTime(collection, job_number, currentTime, startTime, endTime) {
  return new Promise((resolve, reject) => {
    try {
      var searchQuery = { job_number: job_number, date: { $gte: startTime, $lte: endTime } };
      var Fridge = mongoose.model(collection, fridgeSchema);
      Fridge.find(searchQuery, function (err, fridges) {
        if (!err) {
          resolve(fridges);
          console.log(fridges);
        }
        resolve('');
      })

    } catch (error) {
      reject(error);
    }
  });
}

router.get('/getFridges', async function (req, res, next) {

  var collection = '';
  var objs = [];
  // if (req.query.reader_mac)
  //   searchQuery = { name: req.query.name };

  if (req.query.currentTime && req.query.reader_mac && req.query.job_number) {

    let currentTime = req.query.currentTime;
    let sectionTime = [
      new moment(currentTime + ' 07:50:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 10:00:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 10:10:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 11:50:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 12:40:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 15:00:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 15:10:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 16:40:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 16:50:00').format('YYYY-MM-DD HH:mm:ss'),
      new moment(currentTime + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')];

    collection = 'data_' + new moment(currentTime).format('YYYYMMDD') + '_' + req.query.reader_mac;
    // console.log(collection + '->' + searchQuery);
    for (let i = 0; i < sectionTime.length; i += 2) {
      var json = await getSectionTime(collection, req.query.job_number, currentTime, sectionTime[i], sectionTime[i + 1]);
      if (json) objs.push(json[json.length - 1]);
      // console.log(json[0]);
    }
    console.log(objs);
    res.send(objs);
  }
  else {
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
