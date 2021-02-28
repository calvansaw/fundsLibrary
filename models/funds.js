const mongoose = require('mongoose');

////create schema//////
const fundSchema = new mongoose.Schema({
	name: { type: String, required: true },
	riskRating: String,
	fundSize: Number,
	fundSizeFx: { type: String, uppercase: true },
	managementFee: Number,
	dividendDistFreq: String,
	inceptionDate: Date,
	performanceYtd: Number,
	performance1Yr: Number,
	performance3Yr: Number,
	performance5Yr: Number,
	nav: Number,
	navFx: { type: String, uppercase: true },
	product: String,
	assetManager: String,
	assetClass: String,
	subAssetClass: String,
	sharpeRatio1Yr: Number,
	sharpeRatio3Yr: Number,
	sharpeRatio5Yr: Number,
	volatility1Yr: Number,
	volatility3Yr: Number,
	volatility5Yr: Number,
	paymentType: [String],
});

////create model/////
const Fund = mongoose.model('Fund', fundSchema);

////export/////
module.exports = Fund;
