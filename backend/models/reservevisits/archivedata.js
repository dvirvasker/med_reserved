const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const archivedataSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		family: { type: String, require: true },
		personal_number: { type: String },
		civilian_number: { type: Number },
		present: { type: Boolean, require: true, default: false },
		todayPresent: { type: Boolean, require: true, default: false },
		dailSent: { type: Boolean, require: true, default: false },
		shamapOpen: { type: Boolean, require: true, default: false },
		subject: { type: String, require: true },
		details: { type: String },
		unit: { type: String, require: true },
		job: { type: String, require: true },
		ta: { type: String, require: true },
		date: { type: Date, default: new Date() },
	},
	{ timestamps: true }
);

const Archivedata = mongoose.model("Archivedata", archivedataSchema);

module.exports = Archivedata;
