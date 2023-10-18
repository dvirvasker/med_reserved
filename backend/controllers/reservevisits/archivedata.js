const Archivedata = require("../../models/reservevisits/archivedata");

exports.find = (req, res) => {
	Archivedata.find((err, archivedata) => {
		if (err) res.send(err);
		res.json(archivedata);
	});
};

exports.findById = (req, res) => {
	Archivedata.findById(req.params.id, (err, archivedata) => {
		if (err) res.send(err);
		res.json(archivedata);
	});
};

exports.findbyunitid = (req, res) => {
	Archivedata.findbyunitid(req.params.id, (err, archivedata) => {
		if (err) res.send(err);
		res.json(archivedata);
	});
};

exports.read = async (req, res) => {
	const archivedata = await Archivedata.findById(req.params.id);
	if (!archivedata) {
		res.status(500).json({ message: 'הרמ"מ לא נמצא' });
	} else {
		res.status(200).send([archivedata]);
	}
};

exports.create = (req, res) => {
	const archivedata = new Archivedata(req.body);
	archivedata.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
	Archivedata.findByIdAndUpdate(req.params.archivedataId, req.body)
		.then((archivedata) => res.json(archivedata))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
	Archivedata.deleteOne({ _id: req.params.id })
		.then((archivedata) => res.json(archivedata))
		.catch((err) => res.status(400).json("Error: " + err));
};

//
