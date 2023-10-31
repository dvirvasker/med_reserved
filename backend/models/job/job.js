const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const JobSchema = new mongoose.Schema({
	name: { type: String },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
