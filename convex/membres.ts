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
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("membres").collect();
  },
});

export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return ctx.db
      .query("membres")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

export const createProfile = mutation({
  args: {
    nom: v.string(),
    role: v.string(),
    competences: v.array(v.string()),
    initiales: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Non authentifié");
    const existing = await ctx.db
      .query("membres")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    if (existing) return existing._id;
    return ctx.db.insert("membres", { ...args, userId });
  },
});

export const updateRole = mutation({
  args: { id: v.id("membres"), role: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { role: args.role });
  },
});

export const remove = mutation({
  args: { id: v.id("membres") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});
