const Archivedata = require("../../models/reservevisits/archivedata");

exports.find = (req, res) => {
	Archivedata.find((err, archivedata) => {
		if (err) res.send(err);
		res.json(archivedata);
	}).sort({ date: -1});
};

exports.findById = (req, res) => {
	Archivedata.findById(req.params.id, (err, archivedata) => {
		if (err) res.send(err);
		res.json(archivedata);
	});
};

exports.findbypersonalnumber = (req, res) => {
	Archivedata.find({ personal_number: req.params.personalnumber })
		.sort({ date: -1})
		.then((archivedata) => 
			res.json(archivedata))
		.catch((err) => res.status(400).json("Error: " + err));
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
	console.log(req.body);
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

exports.addArrayArchive = (req, res) => {
	const present = req.body.present;
	const todayPresent = req.body.todayPresent;
	const dailSent = req.body.dailSent;
	const shamapOpen = req.body.shamapOpen;
	const name = req.body.name;
	const family = req.body.family;
	const unit = req.body.unit;
	const subject = req.body.subject;
	const job = req.body.job;
	const ta = req.body.ta;
	const personal_number = req.body.personal_number;
	const civilian_number = req.body.civilian_number;

	let arrayDate = req.body.date;
	for(let i=0;i<arrayDate.length;i++){
		const date = new Date(arrayDate[i].year, arrayDate[i].month-1, arrayDate[i].day+1);
		const archivedata = new Archivedata({
			present,
			todayPresent,
			dailSent,
			shamapOpen,
			name,
			family,
			unit,
			subject,
			job,
			ta,
			personal_number,
			civilian_number,
			date,
		  });
			archivedata.save((err, data) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}
		});
	}
	
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
