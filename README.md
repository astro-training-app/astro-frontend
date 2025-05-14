This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

bonjour

# 🚀 Sprint 0 — Astro Training App (Front-end)

## 📚 Objectif

Mettre en place les fondations du projet front-end avec Next.js (App Router), React et Tailwind CSS v3.  
Ce Sprint comprend l'installation, la mise en page initiale et les premières fonctionnalités dynamiques.

---

## ✅ Tâches réalisées

### 🎨 Mise en place technique

- [x] Création du projet Next.js avec App Router – `2 pts`
- [x] Configuration de Tailwind CSS avec thème sombre (`@apply`) – `2 pts`
- [x] Création du layout global (`Navbar`, `Footer`) – `7 pts`
- [x] Page d’accueil responsive – `3 pts`

### 🔍 Fonctionnalités page `trouver-coach`

- [x] Création de la page `app/trouver-coach/page.jsx` – `2 pts`
- [x] Champ de recherche contrôlé avec `useState` – `2 pts`
- [x] Filtrage dynamique des coachs avec `.filter()` – `3 pts`
- [x] Création du composant `CoachCard.jsx` – `3 pts`
- [x] Design amélioré des cartes (icône, couleurs, hover, responsive) – `5 pts`

---

## 🧮 Total des points validés

**🟢 29 / 29 points – Sprint 0 terminé à 100%**

---

## 🧱 Back-end (Sprint 1 à venir)

Le back-end sera lancé dans le prochain Sprint avec :

- Base de données `astro_training`
- Tables : `users`, `clients`, `mensurations`
- API test de récupération des coachs (`GET`)

# 🚀 Sprint 1 — Astro Training App (Back-end + Intégration API)

## 📚 Objectif

Commencer le développement du back-end avec MySQL.  
Créer une base de données pour gérer les coachs, les clients et leurs mensurations.  
Mettre en place les premières API pour connecter le front aux données réelles.

---

## 🔧 Tâches Sprint 1

| Tâche                                                     | Points | Statut     |
| --------------------------------------------------------- | ------ | ---------- |
| 🗃️ Création de la base MySQL `astro_training`             | 3 pts  | 🔲 À faire |
| 📐 Création des tables `users`, `clients`, `mensurations` | 4 pts  | 🔲 À faire |
| 👤 Insertion d’un coach fictif (admin) pour test          | 2 pts  | 🔲 À faire |
| 🔌 Connexion test avec TablePlus ou MySQL Shell           | 2 pts  | 🔲 À faire |
| 🌐 Création d’une API route `GET /api/coachs`             | 3 pts  | 🔲 À faire |
| 🧪 Test de l’API en front dans `trouver-coach/page.jsx`   | 3 pts  | 🔲 À faire |

---

## 🧮 Total prévu Sprint 1

**🔵 17 points à valider**

---

## 📝 À mettre dans Notion (Sprint 1 – Colonne “🟡 En cours”) :

- ✅ Créer un ticket par **tâche ci-dessus**
- 📌 Ajouter les points dans la propriété “Story Points”
- 🎯 Utiliser les étiquettes “Back-end”, “API”, “BDD” pour mieux les trier
- ⏳ Déplacer la première tâche (“Créer base astro_training”) en **En cours**
