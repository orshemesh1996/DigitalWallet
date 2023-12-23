const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/groupAccount", proxy("http://localhost:8001"));
app.use("/requestPending", proxy("http://localhost:8003"));
app.use("/transactionHistory", proxy("http://localhost:8004"));

app.use("/", proxy("http://localhost:8002")); // user

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
