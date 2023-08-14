const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwtGenerator = require("../jwtolusturucu.js");
const authorize = require("../authorizejwt.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { user_email, user_name, user_pass } = req.body;

  try {
    const existingUser = await prisma.kullanici.findUnique({
      where: {
        user_email: user_email,
      },
    });

    if (existingUser) {
      return res.status(401).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(user_pass, 10);
    const generatedUserId = jwtGenerator(user_email);

    const newUser = await prisma.kullanici.create({
      data: {
        user_name: user_name,
        user_email: user_email,
        user_pass: hashedPassword,
        user_id: generatedUserId,
      },
    });

    const jwtToken = jwtGenerator(newUser.user_id);

    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { user_email, user_pass } = req.body;

  try {
    const user = await prisma.kullanici.findUnique({
      where: {
        user_email: user_email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(user_pass, user.user_pass);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const jwtToken = jwtGenerator(user.user_id);

    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/verify", authorize, async (req, res) => {
  try {
    res.json({ verified: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;