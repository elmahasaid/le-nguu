// app/not-found.tsx
// Page affichée quand une adresse n'existe pas (remplace le « 404 This page could not be found » anglais).
import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ background: "#fbf9f4" }}>
      <div className="wrap" style={{ textAlign: "center", padding: "90px 20px 110px" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#0f3d2e",
          }}
        >
          Erreur 404
        </p>

        <h1
          style={{
            margin: "14px 0 12px",
            fontFamily: "var(--font-baskerville), Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.15,
            color: "#0f1012",
          }}
        >
          Cette page n'existe pas
        </h1>

        <p style={{ margin: "0 auto 28px", maxWidth: "460px", fontSize: "17px", lineHeight: 1.5, color: "#5b5f66" }}>
          Le lien est peut-être incorrect, ou l'article a été déplacé. Vous pouvez revenir à la une
          ou choisir une rubrique dans le menu.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 26px",
            background: "#0f3d2e",
            color: "#ffffff",
            borderRadius: "2px",
            textDecoration: "none",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
