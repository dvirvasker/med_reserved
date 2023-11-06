const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const RegionSchema = new mongoose.Schema({
	name: { type: String },
});

const Region = mongoose.model("Region", RegionSchema);

module.exports = Region;
