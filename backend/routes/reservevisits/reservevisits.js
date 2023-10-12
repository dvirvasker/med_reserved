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
router.put("/reservevisits/remove/:id", remove);
router.get("/reservevisits/:id", read);
router.post("/reservevisits", create);

router.put("/reservevisits/:reservevisitsId", update);

router.get("/reservevisits", find);

module.exports = router;
