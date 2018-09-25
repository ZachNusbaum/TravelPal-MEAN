const express = require('express');
const router = express.Router();
const comparison = require('../models/comparison');

router.get('/', (req, res) => {
  comparison.getAll((err, comps) => {
    console.log(comps);
    if(err) {
      res.json({success: false, message: err});
    } else {
      res.write(JSON.stringify({success: true, results: comps}));
      res.send();
    }
  });
});

router.post('/', (req, res, next) => {
  let newComparison = new comparison({
    lat1: req.body.lat1,
    lng1: req.body.lng1,
    lat2: req.body.lat2,
    lng2: req.body.lng2,
    timestamp: Date.now(),
    input1: req.body.input1,
    input2: req.body.input2
  });

  comparison.addNew(newComparison, (err, comp) => {
    if(err) {
      res.json({success: false, message: err});
    } else {
      res.json({success: true});
    }
  });
});

module.exports = router;