const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reservevisitSchema = new mongoose.Schema({
	_id: { type: ObjectId },
	Name: { type: String },
	Present: { type: Boolean },
	TodayPresent: { type: Boolean },
	DailSent: { type: Boolean },
	ShamapOpen: { type: Boolean },
	subject: { type: String },
	Details: { type: String },
});

const Reservevisit = mongoose.model("Reservevisit", reservevisitSchema);

module.exports = Reservevisit;
