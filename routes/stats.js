const express = require("express")
const statRouter = express.Router()
const Stat = require("../models/stats")

statRouter.get("/", (req, res, next) => {
	Stat.find({ user: req.user._id }, (err, stats) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.send(stats)
	})
})

statRouter.post("/", (req, res, next) => {
	const stat = new Stat(req.body)
	stat.user = req.user._id
	stat.save(function(err, newStat) {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(201).send(newStat)
	})
})

statRouter.get("/:statId", (req, res, next) => {
	Stat.findOne({ _id: req.params.statId, user: req.user._id }, (err, stat) => {
		if (err) {
			res.status(500)
			return next(err)
		} else if (!stat) {
			res.status(404)
			return next(new Error("No stat item found."))
		}
		return res.send(stat)
	})
})

statRouter.put("/:statId", (req, res, next) => {
	Stat.findOneAndUpdate(
		{ _id: req.params.statId, user: req.user._id },
		req.body,
		{ new: true },
		(err, stat) => {
			if (err) {
				console.log("Error")
				res.status(500)
				return next(err)
			}
			return res.send(stat)
		}
	)
})

statRouter.delete("/:statId", (req, res, next) => {
	Stat.findOneAndRemove({ _id: req.params.statId, user: req.user._id }, (err, stat) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.send(stat)
	})
})

module.exports = statRouter
