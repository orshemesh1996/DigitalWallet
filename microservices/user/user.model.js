const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  phone: { type: String, required: true },
  balance: { type: Number, required: true },
  requestPendingId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "requestPending",
      required: true,
    },
  ],
  transactionHistoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transactionHistory",
      required: true,
    },
  ],
  groupAccount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groupAccount",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
