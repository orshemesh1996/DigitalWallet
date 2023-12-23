const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createuser,
  updateUser,
  deleteUser,
  getUser,
  transferRequest,
  transferConfirmation,
} = require("./user.controllers");

router.get("/", getAllUser);
router.post("/create", createuser);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/:userId/transferRequest", transferRequest);
router.post("/:userId/transferConfirmation", transferConfirmation);
module.exports = router;
