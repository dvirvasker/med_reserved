const mongoose = require("mongoose");
const Unit = require("../../models/units/units");

exports.find = (req, res) => {
  Unit.find()
    .sort({ index: 1 })
    .then((units) => res.json(units))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findByUnit = (req, res) => {
  const id = String(req.params.id);
  Unit.find({ $or: [{ _id: id }, { _id: mongoose.Types.ObjectId(id) }] })
    .then((units) => {
      console.log(id);
      console.log(units);
      if (Array.isArray(units) && units.length > 0) {
        res.json(units);
      } else {
        res.status(400).json("error");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findUnitByRegion = (req, res) => {
  Unit.find({ region: req.params.region })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
};

//! expremental
exports.UnitLength = (req, res) => {
  Unit.countDocuments({})
    .then((count) => res.json(count))
    .catch((err) => res.status(400).json("Error: " + err));
};
//!
