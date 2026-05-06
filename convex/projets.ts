import { query, mutation, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { ADMIN_EMAIL } from "./users";

async function requireAdmin(ctx: MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Non authentifié");
  const user = await ctx.db.get(userId);
  if (user?.email !== ADMIN_EMAIL) throw new Error("Accès refusé — admin uniquement");
  return userId;
}

export const list = query({
  handler: async (ctx) => {
    return ctx.db.query("projets").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    nom: v.string(),
    auteur: v.string(),
    description: v.string(),
    tags: v.array(v.string()),
    statut: v.string(),
    lien: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Non authentifié");
    return ctx.db.insert("projets", { ...args, userId });
  },
});

export const remove = mutation({
  args: { id: v.id("projets") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

export const updateStatut = mutation({
  args: { id: v.id("projets"), statut: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { statut: args.statut });
  },
});
