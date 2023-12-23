const mongoose = require("mongoose");

const GroupAccountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nameGroup: { type: String, required: true },
  balance: { type: Number, required: true },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
});

module.exports = mongoose.model("GroupAccount", GroupAccountSchema);
