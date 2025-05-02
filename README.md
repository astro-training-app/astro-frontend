# 🦾 FitCoach – Astro Training App

Ce projet est une application de coaching sportif permettant aux coachs de suivre leurs clients et aux clients de consulter leur évolution physique. Le projet est développé avec Next.js (App Router), React 19 et Tailwind CSS v4.

---

# 🚀 Sprint 0 — Astro Training App (Front-end)

## 📚 Objectif

Mettre en place les fondations du projet front-end avec Next.js (App Router), React et Tailwind CSS.  
Ce sprint comprend l’installation, la mise en page initiale et les premières fonctionnalités visuelles dynamiques.

---

## ✅ Tâches réalisées

### 🎨 Mise en place technique

- [x] Création du projet Next.js avec App Router – `2 pts`
- [x] Configuration de Tailwind CSS avec thème sombre (via `@apply` et variables CSS) – `2 pts`
- [x] Création du layout global avec `Navbar` (toggle clair/sombre) et `Footer` – `7 pts`
- [x] Page d’accueil responsive avec boutons dynamiques – `3 pts`

### 🔍 Fonctionnalités page `trouver-coach`

- [x] Création de la page `app/trouver-coach/page.jsx` – `2 pts`
- [x] Champ de recherche contrôlé avec `useState` – `2 pts`
- [x] Filtrage dynamique des coachs avec `.filter()` – `3 pts`
- [x] Création du composant `CoachCard.jsx` – `3 pts`
- [x] Design amélioré des cartes (icône, couleurs, hover, responsive) – `5 pts`

---

## 🌙 Système clair/sombre

Un bouton dans la `Navbar.jsx` permet de basculer manuellement entre le thème clair et sombre.  
Les couleurs sont définies via des variables CSS (`--background`, `--foreground`) dans `globals.css`.  
Tailwind CSS est configuré pour appliquer automatiquement ces variables via les classes `bg-background` et `text-foreground`.

---

## 🧮 Total des points validés

**🟢 29 / 29 points – Sprint 0 terminé à 100%**

---

# 🧱 Back-end à venir (Sprint 1)

Le back-end sera lancé dans le prochain Sprint avec :

- Une base de données `astro_training`
- Trois tables principales : `users`, `clients`, `mensurations`
- Une API route test de récupération des coachs (`GET /api/coachs`)

---

# 🧪 Tâches Sprint 1 à créer dans Linear

| Tâche                                                     | Points | Statut     |
| --------------------------------------------------------- | ------ | ---------- |
| 🗃️ Création de la base MySQL `astro_training`             | 3 pts  | 🔲 À faire |
| 📐 Création des tables `users`, `clients`, `mensurations` | 4 pts  | 🔲 À faire |
| 👤 Insertion d’un coach fictif (admin) pour test          | 2 pts  | 🔲 À faire |
| 🔌 Connexion test avec TablePlus ou MySQL Shell           | 2 pts  | 🔲 À faire |
| 🌐 Création d’une API route `GET /api/coachs`             | 3 pts  | 🔲 À faire |
| 🧪 Test de l’API en front dans `trouver-coach/page.jsx`   | 3 pts  | 🔲 À faire |

**🔵 Total prévu Sprint 1 : 17 points à valider**

---

## 👨‍💻 Réalisé par

- **Koka** – Front-end principal & chef de projet
- **Arthur** – Back-end (Sprint 1 à venir)
