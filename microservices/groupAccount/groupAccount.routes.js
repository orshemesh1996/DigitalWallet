const express = require("express");
const router = express.Router();
const {
  getAllGroupAccount,
  createGroupAccount,
  updateGroupAccount,
  deleteGroupAccount,
  getGroupAccount,
} = require("./groupAccount.controllers");
router.get("/", getAllGroupAccount);
router.post("/create", createGroupAccount);
router.get("/:groupAccountId", getGroupAccount);
router.patch("/:groupAccountId", updateGroupAccount);
router.delete("/:groupAccountId", deleteGroupAccount);

module.exports = router;
