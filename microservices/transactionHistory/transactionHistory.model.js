const mongoose = require("mongoose");

const TransactionHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userTransferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userReceivesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  transaction: { type: Number, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TransactionHistory", TransactionHistorySchema);
