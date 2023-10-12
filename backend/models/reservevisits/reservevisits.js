const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reservevisitsSchema = new mongoose.Schema({
	name: { type: String, require: true },
	family: { type: String, require: true },
	pesonal_number: { type: String },
	civilian_number: { type: Number },
	present: { type: Boolean, require: true, default: false },
	todayPresent: { type: Boolean, require: true, default: false },
	dailSent: { type: Boolean, require: true, default: false },
	shamapOpen: { type: Boolean, require: true, default: false },
	subject: { type: String, require: true },
	details: { type: String },
	unit: { type: String, require: true },
});

const Reservevisits = mongoose.model("Reservevisits", reservevisitsSchema);

module.exports = Reservevisits;
