const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
	company: {
		type: String,
		required: [true, 'Please provide company name'],
		maxlength: 50
	},
	position: {
		type: String,
		required: [true, 'Please provide position'], 
		maxlength: 10
	}, 
	status: {
		type: String,
		enum: ['in process', 'declined', 'pending'],
		default: 'pending'
	},
	source: {
		type: String, 
		required: [true, 'Please provide job source'],
		maxlength: 10
	},
	notes: {
		type: String, 
		default: ''
	}, 
	dateApplied: {
		type: String,
		required: [true, 'Please provide the date you applied'],
		default: ''
	},
	createdBy: {
		type: mongoose.Types.ObjectId, 
		ref: 'User', 
		required: [true, 'Please provide user']
	}
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema);