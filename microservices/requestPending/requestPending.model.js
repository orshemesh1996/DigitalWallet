const mongoose = require("mongoose");
const transferstatus = require("./enums/transferStatus");

const RequestPendingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userTransferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userReceivesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transaction: { type: Number, required: true },
  transferStatus: { type: String, enum: transferstatus, required: true },
});

module.exports = mongoose.model("RequestPending", RequestPendingSchema);
