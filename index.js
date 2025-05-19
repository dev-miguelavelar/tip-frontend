const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;

const walletAddress = "0xDE747645C42A00b0312f42E1DA794C3F31506858"; // Your Sepolia wallet

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/tip", (req, res) => {
  res.status(402).json({
    price: {
      amount: "1.00",
      currency: "USDC"
    },
    payment: {
      address: walletAddress,
      chain_id: 11155111
    },
    x_request_id: "tip-" + Date.now()
  });
});

app.post("/tip", (req, res) => {
  const { tx_hash, x_request_id } = req.body;
  if (tx_hash) {
    res.status(200).send(`✅ Thanks for tipping! Payment ID: ${x_request_id}`);
  } else {
    res.status(400).send("❌ Missing or invalid transaction.");
  }
});

app.listen(port, () => {
  console.log(`🚀 Tip server running at http://localhost:${port}`);
});