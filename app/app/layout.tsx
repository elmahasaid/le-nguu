import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";

// Polices d'origine du site (inchangées)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
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
