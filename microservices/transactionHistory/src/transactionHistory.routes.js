const express = require("express");
const router = express.Router();
const {
  getAllTransactionHistory,
  createTransactionHistory,
  updateTransactionHistory,
  deleteTransactionHistory,
  getTransactionHistory,
} = require("./transactionHistory.controllers");

router.get("/", getAllTransactionHistory);
router.post("/create", createTransactionHistory);
router.get("/:transactionHistoryId", getTransactionHistory);
router.patch("/:transactionHistoryId", updateTransactionHistory);
router.delete("/:transactionHistoryId", deleteTransactionHistory);

module.exports = router;
