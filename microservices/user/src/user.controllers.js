const User = require("./user.model");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();
module.exports = {
  getAllUser: (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json({
          users,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getUser: (req, res) => {
    const userId = req.params.userId;
    User.findById(userId)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createuser: (req, res) => {
    const {
      name,
      email,
      phone,
      balance,
      requestPendingId,
      transactionHistoryId,
      groupAccount,
    } = req.body;

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      balance,
      requestPendingId,
      transactionHistoryId,
      groupAccount,
    });
    user
      .save()
      .then(() => {
        res.status(200).json({
          message: "Create a new user",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateUser: (req, res) => {
    const userId = req.params.userId;
    User.updateOne({ _id: userId }, req.body)
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
  transferRequest: (req, res) => {
    const userId = req.params.userId;
    const requestData = req.body;
    const url = process.env.CREATE_REQUEST_PENDING;
    const dataToSend = {
      userTransferId: userId,
      userReceivesId: requestData.userReceivesId,
      transaction: requestData.transaction,
      transferStatus: requestData.transferStatus,
    };
    User.findById(userId).then((user) => {
      if (user.balance - dataToSend.transaction < 0) {
        res.status(200).json({
          message: "You do not have enough money to make the transfer",
        });
      }
    });
    User.findById(userId).then((userTransfer) => {
      userTransfer.balance = userTransfer.balance - dataToSend.transaction;
      User.updateOne({ _id: userId }, userTransfer)
        .then(() => {})
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    });

    axios
      .post(url, dataToSend)
      .then((response) => {
        //sendNotification() : Here you can send an SMS message to the user receiving the request
        res.status(200).json({
          message: "The transfer request has been made",
        });
        return;
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  transferConfirmation: (req, res) => {
    const userId = req.params.userId;
    const currentDate = new Date();
    const requestData = req.body;
    const urlUpdate = process.env.UPDATE_REQUEST_PENDING + "/" + userId;
    const urlGet = process.env.GET_REQUEST_PENDING;
    const newTransactionHistory = {
      userTransferId: userId,
      userReceivesId: requestData.userReceivesId,
      transaction: requestData.transaction,
      transaction: currentDate.toLocaleString(),
    };

    axios
      .get(`${urlGet}/${requestData.requestPendingId}`)
      .then((responseRequestPending) => {
        const newTransactionHistory = {
          userTransferId:
            responseRequestPending.data.requestPending.userReceivesId,
          userReceivesId: req.params.userId,
          transaction: responseRequestPending.data.requestPending.transaction,
        };
        console.log(newTransactionHistory);

        responseRequestPending.data.transferStatus =
          requestData.transactionalAnswer;
        let newbalance = responseRequestPending.data.requestPending.transaction;
        axios
          .get(`${process.env.GET_USER_ID}/${userId}`)
          .then((responseUser) => {
            newbalance += responseUser.data.user.balance;
            User.updateOne({ _id: userId }, { $set: { balance: newbalance } })
              .then((result) => {
                console.log("Update result:", result);
                if (result.matchedCount === 1) {
                  axios
                    .post(
                      process.env.CREATE_TRANSACTIONHISTORY,
                      newTransactionHistory,
                    )
                    .then((response) => {
                      console.log("Response:", response.data);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                } else {
                  console.log("No matching user found");
                }
              })
              .catch((error) => {
                console.error("Update error:", error);
              });
          })
          .catch((error) => {
            console.error("GET by ID Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  deleteUser: (req, res) => {
    const userId = req.params.userId;

    User.deleteOne({ _id: userId })
      .then(() => {
        res.status(200).json({
          message: `user _id:${userId} Deleted`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
