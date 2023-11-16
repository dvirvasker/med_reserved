const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UnitSchema = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	index: { type: Number },
	region: { type: String },
});

const Unit = mongoose.model("Unit", UnitSchema);

module.exports = Unit;
