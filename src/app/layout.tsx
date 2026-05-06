import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://club-entrepreneuriat-eneam.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Club Entrepreneuriat ENEAM",
    template: "%s · Club Entrepreneuriat ENEAM",
  },
  description:
    "Le Club Entrepreneuriat de l'ENEAM accompagne les étudiants de l'École Nationale d'Économie Appliquée et de Management du Bénin pour transformer leurs idées en projets concrets.",
  keywords: [
    "entrepreneuriat", "ENEAM", "Bénin", "club étudiant", "startup", "innovation",
    "École Nationale d'Économie Appliquée et de Management", "Cotonou",
  ],
  authors: [{ name: "Club Entrepreneuriat ENEAM" }],
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: siteUrl,
    siteName: "Club Entrepreneuriat ENEAM",
    title: "Club Entrepreneuriat ENEAM",
    description:
      "Transforme ton idée en projet concret avec le Club Entrepreneuriat de l'ENEAM — programme en 5 phases, mai–juillet 2026.",
    images: [
      {
        url: "/assets/logo-club.jpeg",
        width: 1254,
        height: 1254,
        alt: "Club Entrepreneuriat ENEAM",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Club Entrepreneuriat ENEAM",
    description:
      "Transforme ton idée en projet concret avec le Club Entrepreneuriat de l'ENEAM.",
    images: ["/assets/logo-club.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
