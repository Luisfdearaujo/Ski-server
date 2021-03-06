const router = require("express").Router();

const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res) => {
	res.json("IT WORKS!🤯");
});
// POST /api/upload - Used for uploading an image
router.post(
	"/api/upload",
	fileUploader.single("imageUrl"),
	(req, res, next) => {
		// console.log("file is: ", req.file)

		if (!req.file) {
			next(new Error("No file uploaded!"));
			return;
		}

		// Get the URL of the uploaded file and send it as a response.
		// 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

		res.json({ secure_url: req.file.path });
	}
);

module.exports = router;
