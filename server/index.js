const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware (json parser)

app.use(express.json());
app.use(cors());

// search

app.get("/barkodproducts", async (req, res) => {
  try {
    res.json(req.query);
  } catch (error) {
    console.error(error);
  }
});

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
      "SELECT * FROM barkodproducts WHERE barcode = $1",
      [barcodeid]
    );
    res.json(getidbarcode.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// update barkod
app.put("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params; // where
  const { product_id, product_name, amount, production_date, unit } = req.body; // SET

  try {
    const updatebarcode = await pool.query(
      "UPDATE barkodproducts SET product_id = $1 , product_name = $2 , amount = $3 , production_date = $4 , unit = $5 WHERE barcode = $6",
      [product_id, product_name, amount, production_date, unit, barcodeid]
    );
    res.json("BARKOD GÜNCELLENDİ ");
  } catch (error) {
    console.error(error);
  }
});

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

// delete barkod

app.delete("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params;
  try {
    const deletebarcode = await pool.query(
      "DELETE FROM barkodproducts WHERE barcode = $1",
      [barcodeid]
    );
    res.json("BARKOD SİLİNDİ");
  } catch (error) {
    console.error(error);
  }
});

// listen

app.listen(5000, () => {
  console.log("port 5000 dinleniyor");
});
