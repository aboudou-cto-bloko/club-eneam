import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Profil étendu d'un membre (lié à users via userId)
  membres: defineTable({
    userId: v.id("users"),
    nom: v.string(),
    prenoms: v.optional(v.string()),
    filiere: v.optional(v.string()),
    annee: v.optional(v.string()),
    role: v.string(), // "Coordinateur" | "Vice-coordinateur" | "Secrétaire" | "Trésorier" | "Membre"
    competences: v.array(v.string()),
    initiales: v.string(),
  }).index("by_userId", ["userId"]),

  // Projets soumis par les membres
  projets: defineTable({
    nom: v.string(),
    auteur: v.string(),
    description: v.string(),
    tags: v.array(v.string()),
    statut: v.string(), // "Idée" | "Prototype" | "En développement" | "Lancé"
    lien: v.optional(v.string()),
    userId: v.optional(v.id("users")),
  }),

  // Annonces / feed du dashboard (ajoutées par le coordinateur)
  annonces: defineTable({
    titre: v.string(),
    contenu: v.string(),
    date: v.string(),
    type: v.string(), // "Événement" | "Conférence" | "Challenge" | "Outil"
    badge: v.string(),
    userId: v.optional(v.id("users")),
  }),

  // Ressources partagées (guides, liens, vidéos)
  ressources: defineTable({
    titre: v.string(),
    description: v.string(),
    type: v.string(), // "Guide" | "Vidéo" | "Lien" | "Livre"
    categorie: v.string(),
    url: v.optional(v.string()),
    userId: v.optional(v.id("users")),
  }),
});
