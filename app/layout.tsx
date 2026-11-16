import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Libre_Baskerville,
  Cormorant_Garamond,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import "./mobile.css";
import "./editorial.css";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";

// Navigation, menus, catégories et infos secondaires
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Ancienne police des titres (encore utilisée par le logo et certaines pages)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
// Titres principaux
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
  display: "swap",
});
// Sous-titres et intertitres
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
// Corps des articles
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Nguu - L'Info Autrement",
  description: "Journal en ligne",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f3d2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fonts = [
    inter.variable,
    playfair.variable,
    baskerville.variable,
    cormorant.variable,
    sourceSerif.variable,
  ].join(" ");

  return (
    <html lang="fr">
      <body className={`${fonts} font-sans antialiased`}>
        {/* Desktop : en-tête classique (masqué sur mobile par mobile.css) */}
        <div className="only-desktop">
          <Header />
        </div>

        {/* Mobile : en-tête compact style Le Parisien (masqué sur desktop) */}
        <div className="only-mobile">
          <MobileHeader />
        </div>

        {children}
        <Footer />
      </body>
    </html>
  );
}
