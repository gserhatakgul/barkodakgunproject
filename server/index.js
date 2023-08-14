const express = require("express");
const cors = require("cors");
const app = express();


const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//middleware (json parser)

app.use(express.json());
app.use(cors());

//routes

app.use("/authentication", require("./routes/auth"));
app.use("/barcode", require("./routes/barcode"));

// listen

app.listen(5000, () => {
  console.log("port 5000 dinleniyor");
});
