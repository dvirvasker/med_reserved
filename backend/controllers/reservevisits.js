const Reservevisits = require('../models/reservevisits');

exports.read = async (req, res) => {
  const reservevisits = await Reservevisits.findById(req.params.id);
  if (!reservevisits) {
    res.status(500).json({ message: 'הרמ"מ לא נמצא' })
  } else {
    res.status(200).send([reservevisits])
  }
}

exports.find = (req, res) => {
  Reservevisits.find()
    .then((reservevisits) => res.json(reservevisits))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const reservevisits = new Reservevisits(req.body);
  reservevisits.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Reservevisits.findByIdAndUpdate(req.params.reservevisitsId, req.body)
    .then((candidatepreference) => res.json(candidatepreference))
    .catch((err) => res.status(400).json("Error: " + err));
}

exports.remove = (req, res) => {
  Reservevisits.deleteOne({ _id: req.params.id })
    .then((reservevisits) => res.json(reservevisits))
    .catch((err) => res.status(400).json("Error: " + err));
};

//
