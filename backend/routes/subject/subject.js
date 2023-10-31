const express = require("express");
const router = express.Router();
const {
	create,
	find,
	read,
	update,
	remove,
} = require("../../controllers/subjects/subject");

// find spec
router.put("/subject/remove/:id", remove);
router.get("/subject/:id", read);
router.post("/subject", create);

router.put("/subject/:SubjectId", update);

router.get("/subject", find);

module.exports = router;
