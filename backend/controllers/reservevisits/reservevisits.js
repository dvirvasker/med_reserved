const { query } = require("express");
const Reservevisit = require("../../models/reservevisits/reservevisits");

exports.find = (req, res) => {
	Reservevisit.find((err, reservevisits) => {
		if (err) res.send(err);
		res.json(reservevisits);
	});
};

exports.findById = (req, res) => {
	Reservevisit.findById(req.params.id, (err, reservevisit) => {
		if (err) res.send(err);
		res.json(reservevisit);
	});
};

exports.findbyunitid = (req, res) => {
	Reservevisit.findbyunitid(req.params.id, (err, reservevisits) => {
		if (err) res.send(err);
		res.json(reservevisits);
	});
};
