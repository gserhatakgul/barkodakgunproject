const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());
// get barkod

// update barkod

app.post("/barkodproducts", (req, res) => {
  try {
    const {barcodedata} = req.body 
    
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("port 5000 dinleniyor ");
});
