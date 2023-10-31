const express = require("express");
const router = express.Router();
const {
	create,
	find,
	read,
	update,
	remove,
} = require("../../controllers/reservevisits/archivedata.js");

// find spec
router.put("/archivedata/remove/:id", remove);
router.get("/archivedata/:id", read);
router.post("/archivedata", create);

router.put("/archivedata/:archivedataId", update);

router.get("/archivedata", find);

module.exports = router;
