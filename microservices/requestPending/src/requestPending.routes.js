const express = require("express");
const router = express.Router();
const {
  getAllRequestPending,
  createRequestPending,
  updateRequestPending,
  deleteRequestPending,
  getRequestPending,
  //confirmRequestPending
} = require("./requestPending.controllers");

router.get("/", getAllRequestPending);
router.post("/create", createRequestPending);
router.get("/:requestPendingId", getRequestPending);
router.patch("/:requestPendingId", updateRequestPending);
router.delete("/:requestPendingId", deleteRequestPending);
//router.patch('/confirm/:requestPendingId',deleteRequestPending);

module.exports = router;
