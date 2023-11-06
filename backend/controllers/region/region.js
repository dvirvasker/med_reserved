const Region = require("../../models/region/region");

exports.find = (req, res) => {
	Region.find((err, Region) => {
		if (err) res.send(err);
		res.json(Region);
	});
};

exports.findById = (req, res) => {
	Region.findById(req.params.id, (err, sub) => {
		if (err) res.send(err);
		res.json(sub);
	});
};

// exports.findbyunitid = (req, res) => {
// 	Region.findbyunitid(req.params.id, (err, sub) => {
// 		if (err) res.send(err);
// 		res.json(sub);
// 	});
// };

exports.read = async (req, res) => {
	const region = await Region.findById(req.params.id);
	if (!region) {
		res.status(500).json({ message: 'הרמ"מ לא נמצא' });
	} else {
		res.status(200).send([region]);
	}
};

exports.create = (req, res) => {
	const region = new Region(req.body);
	Region.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
	Region.findByIdAndUpdate(req.params.RegionId, req.body)
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
	Region.deleteOne({ _id: req.params.id })
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

//
