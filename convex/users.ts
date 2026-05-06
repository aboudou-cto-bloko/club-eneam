import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const ADMIN_EMAIL = "faboudou.zinsou+club_entrepreneuriat_eneam@gmail.com";

export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;
    return {
      _id: user._id,
      email: user.email ?? null,
      name: user.name ?? null,
      isAdmin: user.email === ADMIN_EMAIL,
    };
  },
});
