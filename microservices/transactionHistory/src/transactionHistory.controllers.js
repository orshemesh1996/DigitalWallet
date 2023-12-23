const TransactionHistory = require("./transactionHistory.model");
const mongoose = require("mongoose");
module.exports = {
  getAllTransactionHistory: (req, res) => {
    TransactionHistory.find()
      .then((transactionHistory) => {
        res.status(200).json({
          transactionHistory,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getTransactionHistory: (req, res) => {
    const transactionHistoryId = req.params.transactionHistoryId;
    TransactionHistory.findById(transactionHistoryId)
      .then((transactionHistory) => {
        res.status(200).json({ transactionHistory });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createTransactionHistory: (req, res) => {
    const { userTransferId, userReceivesId, transaction, time } = req.body;

    const transactionHistory = new TransactionHistory({
      _id: new mongoose.Types.ObjectId(),
      userTransferId,
      userReceivesId,
      transaction,
      time,
    });
    transactionHistory
      .save()
      .then(() => {
        res.status(200).json({
          message: "Create a new transactionHistory",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateTransactionHistory: (req, res) => {
    const transactionHistoryId = req.params.transactionHistoryId;

    TransactionHistory.updateOne({ _id: transactionHistoryId }, req.body)
      .then(() => {
        res.status(200).json({
          message: "transactionHistory Updated",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  deleteTransactionHistory: (req, res) => {
    const transactionHistoryId = req.params.transactionHistoryId;

    TransactionHistory.deleteOne({ _id: transactionHistoryId })
      .then(() => {
        res.status(200).json({
          message: `transactionHistory _id:${transactionHistoryId} Deleted`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
