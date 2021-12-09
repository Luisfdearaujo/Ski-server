const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const slopeSchema = new Schema({
	name: { type: String, required: true },
	country: { type: String, required: true },
	level: {
		type: String,
		enum: ["beginner", "intermediate", "Pro"],
	},
	image: {
		type: String,
		default:
			"https://images.unsplash.com/photo-1535813449-9b1b28174821?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	},
	created: { type: Date, default: Date.now },
	comments: { type: String },
	rating: { type: Number },
	user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Slope", slopeSchema);
