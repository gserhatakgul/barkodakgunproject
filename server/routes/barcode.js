const router = require("express").Router();



const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// search
// const { searchbarkod } = req.query;
// const searchbarkodproducts = await pool.query(
//   "SELECT  * FROM barkodproducts WHERE (product_name ILIKE lower(replace( $1 , 'I' , 'i') ) OR product_name ILIKE upper(replace($1 ,'i','İ'))) OR barcode::TEXT LIKE $1 ",
//   [`%${searchbarkod}%`]
// );
// sql injection orm sayesinde tehdit olmaktan kalktı


app.get("/barkodproducts", async (req, res) => {
    const searchbarkodaranan = req.query.searchbarkodaranan;
    
    try {
      const searchbarkodproducts = await prisma.barkodproducts.findMany({
        where: {
          OR: [
            {
              product_name: {
                contains: searchbarkodaranan,
                mode: "insensitive",
              },
            },
            {
              barcode: {
                equals: searchbarkodaranan
              },
            },
          ],
        },
      });
      res.json(searchbarkodproducts);
    } catch (error) {
      console.error(error);
    }
  });
  
  // get all barkod
  app.get("/barkodproducts/getall", async (req, res) => {
    try {
      const allbarcode = await prisma.barkodproducts.findMany();
      res.json(allbarcode);
    } catch (error) {
      console.error(error.message);
    }
  });
  
  // get barkod
  
  // const getidbarcode = await pool.query(
  //   "SELECT * FROM barkodproducts WHERE barcode = $1",
  //   [barcodeid]
  // );
  
  app.get("/barkodproducts/:barcodeid", async (req, res) => {
    const { barcodeid } = req.params;
    const barcodevalue = parseInt(barcodeid);
    try {
      barcodeget = await prisma.barkodproducts.findUnique({
        where: {
          barcode: barcodevalue,
        },
      });
      res.json(barcodeget);
    } catch (error) {
      console.error(error);
    }
  });
  
  // update barkod
  
  // const updatebarcode = await pool.query(
  //   "UPDATE barkodproducts SET product_id = $1 , product_name = $2 , amount = $3 , production_date = $4 , unit = $5 WHERE barcode = $6",
  //   [product_id, product_name, amount, production_date, unit, barcodeid]
  // );
  app.put("/barkodproducts/:barcodeid", async (req, res) => {
    const { barcodeid } = req.params; // where
    const { product_id, product_name, amount, production_date, unit } = req.body; // SET
    const product_id_value = parseInt(product_id);
    const barcodevalue = parseInt(barcodeid);
    const unitvalue = parseInt(unit);
  
    try {
      const updatebarcode = await prisma.barkodproducts.update({
        where: { barcode: barcodevalue },
        data: {
          product_id: product_id_value,
          product_name: product_name,
          amount: amount,
          production_date: production_date,
          unit: unitvalue,
        },
      });
  
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
      res
        .status(500)
        .json({ error: "An error occurred while creating a new barcode." });
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

  module.exports = router;