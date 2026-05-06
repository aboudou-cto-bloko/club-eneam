import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Seules routes accessibles sans connexion
const isPublicRoute = createRouteMatcher([
  "/connexion",
  "/pta",
]);

const handler = convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (!isPublicRoute(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/connexion");
  }
});

// Next.js 16 renamed middleware to proxy — exporter les deux noms
export default handler;
export { handler as proxy };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
