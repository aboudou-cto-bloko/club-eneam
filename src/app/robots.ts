import { MetadataRoute } from "next";

const siteUrl = "https://club-entrepreneuriat-eneam.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pta"],
        disallow: ["/dashboard", "/projets", "/ressources", "/membres", "/blog", "/connexion"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
