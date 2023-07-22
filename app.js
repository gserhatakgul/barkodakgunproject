const express = require("express");
const app = express();
const pool = require("./db");

//middleware (json parser)

app.use(express.json());

// get all barkod
app.get("/barkodproducts", async (req, res) => {
  try {
    const allbarcode = await pool.query("SELECT * FROM barkodproducts");
    res.json(allbarcode.rows);
  } catch (error) {
    console.error(error);
  }
});

// get barkod

app.get("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params;
  try {
    const getidbarcode = await pool.query(
      "SELECT * FROM barkodproducts WHERE barcode = $1" , [barcodeid]
    );
    res.json(getidbarcode.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// update barkod

// create barkod

app.post("/barkodproducts", async (req, res) => {
  try {
    const { barcode, product_id, product_name, amount, production_date, unit } =
      req.body;
    const newbarcode = await pool.query(
      "INSERT INTO barkodproducts (barcode,product_id,product_name,amount,production_date,unit) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",
      [barcode, product_id, product_name, amount, production_date, unit]
    );
    res.json(newbarcode.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// listen

app.listen(5000, () => {
  console.log("port 5000 dinleniyor");
});
