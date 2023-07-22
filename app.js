const express = require("express");
const app = express();
const pool = require("./db");

//middleware (json parser)

app.use(express.json());

// get barkod

// update barkod

app.post("/barkodproducts", async (req, res) => {
  try {
    const { barcode, product_id, product_name, amount, production_date, unit } =
      req.body;
    const newbarcode = await pool.query(
      "INSERT INTO barkodproducts (barcode,product_id,product_name,amount,production_date,unit) VALUES ($1,$2,$3,$4,$5,$6)",
      [barcode, product_id, product_name, amount, production_date, unit]
    );
    res.json(newbarcode.rows[1]);
  } catch (error) {
    console.error(error);
  }
});

// listen

app.listen(5000, () => {
  console.log("port 5000 dinleniyor");
});
