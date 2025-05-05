const express = require("express");
const router = express.Router();
const db = require("../db");

// route POST LOGIN //
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // je verifie que les champs sont remplie //
  
});
