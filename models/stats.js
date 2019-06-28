const mongoose = require("mongoose")
const Schema = mongoose.Schema

const statSchema = new Schema({
	totalQuestionsRight: {
		type: Number
	},
	totalQuestionsWrong: {
		type: Number,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
})

module.exports = mongoose.model("Stat", statSchema)
