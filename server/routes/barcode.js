const router = require("express").Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Search Barkod Products

router.get("/barkodproducts", async (req, res) => {
  const searchbarkodaranan = req.query.searchbarkod;

  try {
    const searchbarkod = await prisma.barkodproducts.findMany({
      where: {
        OR: [
          ({ barcode: { contains: searchbarkodaranan } },
          {
            product_name: { contains: searchbarkodaranan, mode: "insensitive" },
          }),
        ],
      },
    });

    res.json(searchbarkod);
  } catch (error) {
    console.error(error.message);
  }
});

// Get All Barkod Products
router.get("/barkodproducts/getall", async (req, res) => {
  try {
    const allbarcode = await prisma.barkodproducts.findMany();
    res.json(allbarcode);
  } catch (error) {
    console.error(error.message);
  }
});

// Get Barkod Product by ID
router.get("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params;
  const barcodevalue = parseInt(barcodeid);
  try {
    const barcodeget = await prisma.barkodproducts.findUnique({
      where: {
        barcode: barcodevalue,
      },
    });
    res.json(barcodeget);
  } catch (error) {
    console.error(error);
  }
});

// Update Barkod Product
router.put("/barkodproducts/:barcodeid", async (req, res) => {
  const { barcodeid } = req.params;
  const { product_id, product_name, amount, production_date, unit } = req.body;
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

    res.json("BARKOD GÜNCELLENDİ");
  } catch (error) {
    console.error(error);
  }
});

// Create Barkod Product
router.post("/barkodproducts", async (req, res) => {
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

// Delete Barkod Product
router.delete("/barkodproducts/:barcodeid", async (req, res) => {
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
