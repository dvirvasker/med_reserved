const express = require("express");

const {
	find,
	findbyunitid,
} = require("../../controllers/reservevisits/reservevisits.js");

const router = express.Router();

router.get("/reservevisits/:id", findbyunitid);
router.get("/reservevisits", find);

module.exports = router;
