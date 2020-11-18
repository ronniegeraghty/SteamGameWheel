const express = require("express");
const router = express.Router();

// Sample Model
const Sample = require("../models/Sample");

// Routes for interacting with all Samples
router
  .route("/")
  .get((req, res) => {
    Sample.find({}, (err, foundSamples) => {
      if (err) {
        res.json(err);
      } else {
        res.json(foundSamples);
      }
    });
  })
  .post((req, res) => {
    const newSample = new Sample({
      name: req.body.name,
      message: req.body.message,
    });
    newSample.save((err, sample) => {
      if (err) {
        res.json(err);
      } else {
        res.json(sample);
      }
    });
  })
  .delete((req, res) => {
    Sample.deleteMany({}, (err) => {
      if (err) {
        res.json(err);
      } else {
        res.json("Successfully deleted all samples.");
      }
    });
  });

// Routes for working with a specific sample
router
  .route("/:sampleID")
  .get((req, res) => {
    Sample.findOne({ _id: req.params.sampleID }, (err, foundSample) => {
      if (err) {
        res.json(err);
      } else if (foundSample) {
        res.json(foundSample);
      } else {
        res.json("No Sample matching that ID was found.");
      }
    });
  })
  .put((req, res) => {
    Sample.updateOne(
      { _id: req.params.sampleID },
      { name: req.body.name, message: req.body.message },
      {},
      (err) => {
        if (err) {
          res.json(err);
        } else {
          res.json(`Successfully updated Sample`);
        }
      }
    );
  })
  .patch((req, res) => {
    Sample.updateOne(
      { _id: req.params.sampleID },
      { $set: req.body },
      (err) => {
        if (err) {
          res.json(err);
        } else {
          res.json(`Successfully updated Sample`);
        }
      }
    );
  })
  .delete((req, res) => {
    Sample.deleteOne({ _id: req.params.sampleID }, (err) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          _id: req.params.sampleID,
          text: "The sample was deleted",
        });
      }
    });
  });
module.exports = router;
