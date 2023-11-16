const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const regionSchema = new mongoose.Schema({
	name: { type: String },
});

const region = mongoose.model("region", regionSchema);

module.exports = region;
