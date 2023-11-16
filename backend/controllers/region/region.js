const region = require("../../models/region/region");

exports.find = (req, res) => {
	region.find((err, Region) => {
		if (err) res.send(err);
		res.json(Region);
	}).sort({_id: -1});
};

exports.findById = (req, res) => {
	region.findById(req.params.id, (err, sub) => {
		if (err) res.send(err);
		res.json(sub);
	});
};

// exports.findbyunitid = (req, res) => {
// 	region.findbyunitid(req.params.id, (err, sub) => {
// 		if (err) res.send(err);
// 		res.json(sub);
// 	});
// };

exports.read = async (req, res) => {
	const regionData = await region.findById(req.params.id);
	if (!regionData) {
		res.status(500).json({ message: 'הרמ"מ לא נמצא' });
	} else {
		res.status(200).send([regionData]);
	}
};

exports.create = (req, res) => {
	const regionData = new region(req.body);
	regionData.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
	region.findByIdAndUpdate(req.params.RegionId, req.body)
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
	region.deleteOne({ _id: req.params.id })
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

//
