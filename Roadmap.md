# 🛣️ Roadmap du Projet

Ce document permet de garder une trace claire de vos intentions, avancements, difficultés et priorités.

## 🎯 Objectif du projet

Développer une application mobile de livraison de repas permettant aux utilisateurs de commander des plats depuis différents restaurants. L'interface privilégie une navigation intuitive avec des écrans de listes clairs, des fiches détaillées pour chaque plat et restaurant, et un processus de commande simplifié. Ce choix d'interface vise à offrir une expérience utilisateur fluide et familière, similaire aux applications de livraison populaires.

---

## ✅ Fonctionnalités prévues

- Liste des Plats

- Fiche de détails d'un plat

- Connexion à l'API (préciser si api de mock ou api de prod)

- Liste des restaurants

- Détails d'un restaurant (avec infos et liste des plats)

- Panier (Gestion en mémoire, stockage local, …)

- Authentification (Login, Register, Stockage local, …)

- Création de commande

- Création de plats dans votre restaurant

- Gestion de l'état des commandes reçu dans votre restaurant

---

## 🚧 État d'avancement

Renseignez toutes les fonctionnalités et leur état d'avancement. Vous pouver  en ajouter d'autres si vous avez dévelopé des choses spéciales.

| Fonctionnalité                    | État | Commentaire                                     |
| --------------------------------- | ---- | ----------------------------------------------- |
| Authentification                  | ✅    | Login + Register                                |
| Liste des restaurants             | 🔧   | Liste uniquement, pas de détails                |
| Liste des plats                   | 🔧   | Affichage basique, manque filtres               |
| Fiche détails d'un plat          | ⏳    | Maquette terminée, développement à venir        |
| Détails d'un restaurant          | ⏳    | Dépendant de l'API restaurants                  |
| Connexion à l'API                 | 🔧   | API de mock fonctionnelle, migration vers prod |
| Création de plats (restaurateur)  | ⏳    | Fonctionnalité avancée, priorité basse         |
| Gestion du panier                 | ⏳    | Stockage local prévu avec AsyncStorage         |
| Création de commande              | ⏳    | Prévu dans la dernière semaine de développement |
| Gestion état commandes reçues     | ⏳    | Interface restaurateur à développer            |

Légende :

- ✅ : Terminée
- 🔧 : En cours
- ⏳ : Pas encore commencée

---

## 🧠 Problèmes rencontrés

Listez les blocages techniques ou organisationnels rencontrés, et comment vous les avez (ou comptez les) résoudre.

| Problème | Impact | Solution mise en place ou envisagée |
| -------- | ------ | ----------------------------------- |
| Configuration de l'environnement React Native | Élevé | Utilisation d'Expo CLI pour simplifier le setup |
| Gestion d'état complexe avec le panier | Moyen | Implémentation de Context API ou Redux Toolkit |
| Performance des listes avec beaucoup d'éléments | Moyen | Utilisation de FlatList avec optimisations |
| Authentification sécurisée | Élevé | tokens + stockage sécurisé |

---

## 📅 Prochaines étapes

Expliquez ici ce que vous envisagez pour la suite des fonctionnalités.

- Finaliser l'intégration de l'API de production
- Implémenter la gestion complète du panier avec persistance
- Développer les écrans de détails (plats et restaurants)
- Ajouter un système de notation et commentaires
- Intégrer les notifications push pour le suivi des commandes
- Optimiser les performances et ajouter des animations de transition
- Tests utilisateurs et corrections des bugs identifiés

---

## 🗨️ Commentaires / Retours

Notes, idées, feedback des utilisateurs, ou tout commentaire général utile au suivi du projet.

> Navigation entre les écrans parfois lente - à optimiser avec des transitions plus fluides dans la prochaine itération.

> Prévoir un mode sombre pour l'application - demande récurrente des utilisateurs testeurs.

> Considérer l'ajout d'un système de favoris pour les plats et restaurants.

---
