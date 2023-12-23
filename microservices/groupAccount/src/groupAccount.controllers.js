const GroupAccount = require("./groupAccount.model");
const mongoose = require("mongoose");
module.exports = {
  getAllGroupAccount: (req, res) => {
    GroupAccount.find()
      .then((groupAccounts) => {
        res.status(200).json({
          groupAccounts,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getGroupAccount: (req, res) => {
    const groupAccountId = req.params.groupAccountId;
    User.findById(groupAccountId)
      .then((groupAccount) => {
        res.status(200).json({ groupAccount });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createGroupAccount: (req, res) => {
    const { nameGroup, balance, users } = req.body;

    const groupAccount = new GroupAccount({
      _id: new mongoose.Types.ObjectId(),
      nameGroup,
      balance,
      users,
    });
    groupAccount
      .save()
      .then(() => {
        res.status(200).json({
          message: "Create a new groupAccount",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateGroupAccount: (req, res) => {
    const groupAccountId = req.params.groupAccountId;
    GroupAccount.updateOne({ _id: groupAccountId }, req.body)
      .then(() => {
        res.status(200).json({
          message: "user Updated",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  deleteGroupAccount: (req, res) => {
    const groupAccountId = req.params.groupAccountId;

    GroupAccount.deleteOne({ _id: groupAccountId })
      .then(() => {
        res.status(200).json({
          message: `user _id:${groupAccountId} Deleted`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
