import { MetadataRoute } from "next";

const siteUrl = "https://club-entrepreneuriat-eneam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/pta`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/connexion`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
