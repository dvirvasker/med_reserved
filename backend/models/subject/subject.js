const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
	name: { type: String },
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
