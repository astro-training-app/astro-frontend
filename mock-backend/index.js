const express = require("express"); // import des modules necessaires //
const cors = require("cors");

// je crée un apllication express //
const app = express();

// ici on met le port et aussi le lien du db de db.js //
const url = 5000;
const db = require("./db");

// middleware d'ensemble //
app.use(cors()); // authorise les requetes entre ports differents //
app.use(express.json());

// un p'tit test //
app.get("/", (req, res) => {
  res.send("👋 Bienvenue sur le mock-backend de test");
});

// lancer le serveur sur le port 5000 //
app.listen(url, () => {
  console.log(`☀️ Serveur mock-backend en ecoute sur http://localhost:${url}`);
});
