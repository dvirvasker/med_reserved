const Job = require("../../models/job/job");

exports.find = (req, res) => {
	Job.find((err, job) => {
		if (err) res.send(err);
		res.json(job);
	});
};

exports.findById = (req, res) => {
	Job.findById(req.params.id, (err, job) => {
		if (err) res.send(err);
		res.json(job);
	});
};

exports.findbyunitid = (req, res) => {
	Job.findbyunitid(req.params.id, (err, job) => {
		if (err) res.send(err);
		res.json(job);
	});
};

exports.read = async (req, res) => {
	const job = await Job.findById(req.params.id);
	if (!job) {
		res.status(500).json({ message: 'הרמ"מ לא נמצא' });
	} else {
		res.status(200).send([job]);
	}
};

exports.create = (req, res) => {
	const job = new Job(req.body);
	job.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
	Job.findByIdAndUpdate(req.params.jobId, req.body)
		.then((job) => res.json(job))
		.catch((err) => res.status(400).json("Error: " + err));
};

exports.remove = (req, res) => {
	Job.deleteOne({ _id: req.params.id })
		.then((job) => res.json(job))
		.catch((err) => res.status(400).json("Error: " + err));
};

//
