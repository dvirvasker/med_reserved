const Subject = require("../../models/subject/subject");

exports.find = (req, res) => {
	Subject.find((err, Subject) => {
		if (err) res.send(err);
		res.json(Subject);
	});
};

exports.findById = (req, res) => {
	Subject.findById(req.params.id, (err, sub) => {
		if (err) res.send(err);
		res.json(sub);
	});
};

exports.findbyunitid = (req, res) => {
	Subject.findbyunitid(req.params.id, (err, sub) => {
		if (err) res.send(err);
		res.json(sub);
	});
};

exports.read = async (req, res) => {
	const Subject = await Subject.findById(req.params.id);
	if (!Subject) {
		res.status(500).json({ message: 'הרמ"מ לא נמצא' });
	} else {
		res.status(200).send([Subject]);
	}
};

exports.create = (req, res) => {
	const Subject = new Subject(req.body);
	Subject.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
	Subject.findByIdAndUpdate(req.params.SubjectId, req.body)
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
	Subject.deleteOne({ _id: req.params.id })
		.then((sub) => res.json(sub))
		.catch((err) => res.status(400).json("Error: " + err));
};

//
