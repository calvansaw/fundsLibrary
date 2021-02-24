const mongoose = require('mongoose');

////create schema//////
const fundSchema = new mongoose.Schema({
	name: { type: String, required: true },
	riskRating: { type: String, required: true },
	fundSize: { type: Number, required: true },
	fundSizeFx: { type: String, uppercase: true, required: true },
	managementFee: { type: Number, required: true },
	dividendDistFreq: String,
	inceptionDate: Date,
	performanceYtd: { type: Number, required: true },
	performance1Yr: { type: Number, required: true },
	performance3Yr: { type: Number, required: true },
	performance5Yr: { type: Number, required: true },
	nav: { type: Number, required: true },
	navFx: { type: String, uppercase: true, required: true },
	product: { type: String, required: true },
	assetManager: { type: String, required: true },
	assetClass: { type: String, required: true },
	subAssetClass: { type: String, required: true },
	sharpeRatio1Yr: { type: Number, required: true },
	sharpeRatio3Yr: { type: Number, require: true },
	sharpeRatio5Yr: { type: Number, required: true },
	volatility1Yr: { type: Number, required: true },
	volatility3Yr: { type: Number, required: true },
	volatility5Yr: { type: Number, required: true },
	paymentType: [String],
});

////create model/////
const Fund = mongoose.model('Fund', fundSchema);

////export/////
module.exports = Fund;
