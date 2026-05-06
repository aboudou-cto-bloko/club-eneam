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
    return ctx.db.query("annonces").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    titre: v.string(),
    contenu: v.string(),
    date: v.string(),
    type: v.string(),
    badge: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);
    return ctx.db.insert("annonces", { ...args, userId });
  },
});

export const remove = mutation({
  args: { id: v.id("annonces") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});
