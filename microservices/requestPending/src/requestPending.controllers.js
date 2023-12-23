const RequestPending = require("./requestPending.model");
const mongoose = require("mongoose");
module.exports = {
  getAllRequestPending: (req, res) => {
    RequestPending.find()
      .then((requestPendings) => {
        res.status(200).json({
          requestPendings,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getRequestPending: (req, res) => {
    const requestPendingId = req.params.requestPendingId;
    RequestPending.findById(requestPendingId)
      .then((requestPending) => {
        res.status(200).json({ requestPending });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createRequestPending: (req, res) => {
    const { userTransferId, userReceivesId, transaction, transferStatus } =
      req.body;

    const requestPending = new RequestPending({
      _id: new mongoose.Types.ObjectId(),
      userTransferId,
      userReceivesId,
      transaction,
      transferStatus,
    });
    requestPending
      .save()
      .then(() => {
        res.status(200).json({
          message: "Create a new RequestPending",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateRequestPending: (req, res) => {
    const requestPendingId = req.params.requestPendingId;

    RequestPending.updateOne({ _id: requestPendingId }, req.body)
      .then(() => {
        res.status(200).json({
          message: "RequestPending Updated",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  deleteRequestPending: (req, res) => {
    const requestPendingId = req.params.requestPendingId;

    RequestPending.deleteOne({ _id: requestPendingId })
      .then(() => {
        res.status(200).json({
          message: `RequestPending _id:${requestPendingId} Deleted`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
