const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	role: { type: String, enum: ["admin", "user"], default: "user" },
	image: {
		type: String,
		default:
			"https://images.unsplash.com/photo-1584053774180-06193b6838d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
	},
	slope: [{ type: Schema.Types.ObjectId, ref: "Slope" }],
});

module.exports = model("User", userSchema);
