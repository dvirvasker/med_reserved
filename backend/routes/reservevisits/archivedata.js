const express = require("express");
const router = express.Router();
const {
	create,
	addArrayArchive,
	findbypersonalnumber,
	find,
	read,
	update,
	remove,
} = require("../../controllers/reservevisits/archivedata.js");

// find spec
router.put("/archivedata/remove/:id", remove);
router.get("/archivedata/:id", read);
router.post("/archivedata", create);
router.post("/addArrayArchive", addArrayArchive);

router.put("/archivedata/:archivedataId", update);

router.get("/archivedatafindbyPN/:personalnumber", findbypersonalnumber);
router.get("/archivedata", find);

module.exports = router;
