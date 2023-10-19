const express = require("express");
const router = express.Router();
const {
	create,
	find,
	read,
	update,
	remove,
} = require("../../controllers/job/job.js");

// find spec
router.put("/job/remove/:id", remove);
router.get("/job/:id", read);
router.post("/job", create);

router.put("/job/:jobId", update);

router.get("/job", find);

module.exports = router;
