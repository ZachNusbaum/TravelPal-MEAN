const express = require('express');
const router = express.Router();
const comparison = require('../models/comparison');

router.get('/', (req, res) => {
  res.json({test: 'success'});
});

router.post('/', (req, res, next) => {
  let newComparison = new comparison({
    lat: req.body.lat,
    lng: req.body.lng,
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