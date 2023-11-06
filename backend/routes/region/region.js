const express = require("express");
const router = express.Router();
const {
	create,
	find,
	read,
	update,
	remove,
} = require("../../controllers/region/region.js");

// find spec
router.put("/region/remove/:id", remove);
router.get("/region/:id", read);
router.post("/region", create);

router.put("/region/:RegionId", update);

router.get("/region", find);

module.exports = router;
