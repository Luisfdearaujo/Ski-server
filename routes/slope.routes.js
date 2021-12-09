const express = require("express");
const router = express.Router();
const Slope = require("../models/slope.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");

// POST /api/projects - Create a new SLOPE
router.post("/api/slope/current", async (req, res, next) => {
	try {
		// Get the data from the request body
		const { name, country, level, image, created, comments, rating, user } =
			req.body;

		// Save the data in the db
		const createdSlope = await Slope.create({
			name,
			country,
			level,
			created,
			comments,
			rating,
			user,
		});

		res.status(201).json(createdSlope); // 201 Created
	} catch (error) {
		res.status(500).json(error); // Internal Server Error
	}
});

// GET /api/slope/current - Get all existing Slopes
router.get("/api/slope/current", async (req, res, next) => {
	try {
		const allSlopes = await Slope.find(); //.populate("User");

		res.status(200).json(allSlopes);
	} catch (error) {
		res.status(500).json(error);
	}
});

// GET /api/slope/current:slopeId  - Get a specific slope
router.get("/api/slope/current/:slopeId", async (req, res, next) => {
	try {
		// Get the slope id from the URL
		const { slopeId } = req.params; //   in Express `:` means `req.params`

		if (!mongoose.Types.ObjectId.isValid(slopeId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		// Make a DB query
		const oneSlope = await Slope.findById(slopeId); //.populate("User");

		// Send the response
		res.status(200).json(oneSlope);
	} catch (error) {
		res.status(500).json(error);
	}
});

// PUT  /api/slope/current:slopeId  - Update a specific slope
router.put("/api/slope/current/:slopeId", async (req, res, next) => {
	try {
		// Get the slope id
		const { slopeId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(slopeId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		// Values to use for updating the slope
		const { name, country, level, image, created, comments, rating, user } =
			req.body;

		const updatedSlope = await Slope.findByIdAndUpdate(
			slopeId,
			{ name, country, level, image, created, comments, rating, user },
			{ new: true }
		);

		res.status(200).json(updatedSlope);
	} catch (error) {
		res.status(500).json(error);
	}
});

// DELETE /api/slope/current:slopeId - Delete a specific slope
router.delete("/api/slope/current/:slopeId", async (req, res, next) => {
	try {
		const { slopeId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(slopeId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		await Slope.findByIdAndDelete(slopeId);

		res.status(204).send(); // No Content
	} catch (error) {
		res.status(500).json(error);
	}
});

//ERASE AFTER THIS

// GET /api/slope/current  - Get current slope info
// router.get("/api/slope/current", isAuthenticated, async (req, res, next) => {
// 	try {
// 		const currentSlope = req.payload;
// 		const slope = await Slope.findById(currentSlope._id);

// 		res.status(200).json(user);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // PUT /api/slope/current  - Update the current slope
// router.put("/api/slope/current", isAuthenticated, async (req, res, next) => {
// 	try {
// 		// If the user is authenticated we can access the JWT payload via req.payload
// 		// req.payload holds the user info that was encoded in JWT during login.

// 		const currentSlope = req.payload;
// 		const { email, name } = req.body;

// 		const updatedSlope = await Slope.findByIdAndUpdate(
// 			currentSlope._id,
// 			{ country, name },
// 			{ new: true }
// 		);

// 		res.status(200).json(updatedSlope);
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = router;
