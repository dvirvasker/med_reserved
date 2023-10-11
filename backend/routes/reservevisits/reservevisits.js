const express = require("express");
const router = express.Router();
const {
	create,
	find,
	read,
	update,
	remove,
} = require("../../controllers/reservevisits/reservevisits.js");

// find spec
router.post("/reservevisits", create);

router.get("/reservevisits/:id", read);

router.put("/reservevisits/:reservevisitsId", update);

router.post("/reservevisits/remove/:id", remove);

router.get("/reservevisits", find);

module.exports = router;
