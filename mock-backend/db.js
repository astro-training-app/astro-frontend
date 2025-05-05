// 1. Importe le module sqlite3 avec les messages de debug activés
const sqlite3 = require("sqlite3").verbose();

// 2. Crée une connexion vers le fichier de base
const db = new sqlite3.Database("astro_training.db", (err) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base :", err.message);
  } else {
    console.log("✅ Connecté à la base astro_training.db");

    // 3. Crée la table 'users' si elle n'existe pas
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error(
            "❌ Erreur lors de la création de la table users :",
            err.message
          );
        } else {
          console.log("✅ Table 'users' prête !");
        }
      }
    );
  }
});

// 4. Exporte la connexion pour l'utiliser dans d'autres fichiers
module.exports = db;
