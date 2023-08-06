const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//middleware (json parser)

app.use(express.json());
app.use(cors());

// search
// sql injection

app.get("/barkodproducts", async (req, res) => {
  try {
    const { searchbarkod } = req.query;
    const searchbarkodproducts = await pool.query(
      "SELECT  * FROM barkodproducts WHERE (product_name ILIKE lower(replace( $1 , 'I' , 'i') ) OR product_name ILIKE upper(replace($1 ,'i','İ'))) OR barcode::TEXT LIKE $1 ",
      [`%${searchbarkod}%`]
    );
    res.json(searchbarkodproducts.rows);
  } catch (error) {
    console.error(error);
  }
});

// get all barkod
app.get("/barkodproducts/getall", async (req, res) => {
  try {
    const allbarcode = await pool.query("SELECT * FROM barkodproducts");

    res.json(allbarcode.rows);
  } catch (error) {
    console.error(error.message);
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

// const newbarcode = await pool.query(
//   "INSERT INTO barkodproducts (barcode,product_id,product_name,amount,production_date,unit) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",
//   [barcode, product_id, product_name, amount, production_date, unit]
// res.json(newbarcode.rows[0]);

app.post("/barkodproducts", async (req, res) => {
  try {
    const { barcode, product_id, product_name, amount, production_date, unit } =
      req.body;

    const newBarcode = await prisma.barkodproducts.create({
      data: {
        barcode,
        product_id,
        product_name,
        amount,
        production_date,
        unit,
      },
    });
    console.log("New barcode created:", newBarcode);

    res.json(newBarcode);
  } catch (error) {
    console.error(error);
  }
});

// delete barkod
// const deletebarcode = await pool.query(
//   "DELETE FROM barkodproducts WHERE barcode = $1",
//   [barcodeid]
// );

app.delete("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params;

  const barcodevalue = parseInt(barcodeid);

  try {
    const barcodesil = await prisma.barkodproducts.delete({
      where: {
        barcode: barcodevalue,
      },
    });
    res.json("BARKOD SİLİNDİ");
  } catch (error) {
    console.error(error);
  }
});

// listen

app.listen(5000, () => {
  console.log("port 5000 dinleniyor");
});
