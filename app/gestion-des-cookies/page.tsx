import Link from "next/link";

export default function GestionCookies() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Gestion des cookies</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Gestion des cookies
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>1. Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un fichier texte déposé sur votre terminal (ordinateur, tablette, mobile) lors de votre visite sur notre site. Il permet de reconnaître votre navigateur, de mémoriser vos préférences et de faciliter votre navigation.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>2. Types de cookies utilisés</h2>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li><strong>Cookies strictement nécessaires :</strong> Ils assurent le bon fonctionnement du site (navigation, accès aux articles). Sans eux, le site ne peut pas fonctionner correctement.</li>
            <li><strong>Cookies de performance :</strong> Ils nous aident à mesurer l'audience et à comprendre comment les visiteurs interagissent avec le site (pages les plus lues, temps passé).</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>3. Comment gérer vos préférences ?</h2>
          <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies. Voici comment faire sur les principaux navigateurs :</p>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li><strong>Google Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données des sites.</li>
            <li><strong>Mozilla Firefox :</strong> Options &gt; Vie privée et sécurité &gt; Cookies et données de sites.</li>
            <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies et données de sites web.</li>
          </ul>
          <p style={{ marginTop: "10px" }}>Le refus des cookies n'empêche pas la lecture des articles sur Le Nguu.</p>
        </div>
      </div>
    </main>
  );
}