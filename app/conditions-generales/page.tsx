import Link from "next/link";

export default function ConditionsGenerales() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Conditions générales</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Conditions générales
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>1. Objet</h2>
          <p>Les présentes Conditions Générales ont pour objet de définir les modalités d'accès et d'utilisation du site Le Nguu. En accédant au site, vous acceptez sans réserve les présentes conditions.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>2. Accès au site</h2>
          <p>Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Tous les frais liés à cet accès (matériel, connexion internet) sont à la charge exclusive de l'utilisateur. Le Nguu se réserve le droit de suspendre temporairement l'accès au site pour des raisons de maintenance ou de mise à jour.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>3. Responsabilité</h2>
          <p>Le Nguu s'efforce de fournir des informations exactes et à jour, mais ne saurait être tenu responsable des omissions, des inexactitudes ou des erreurs présentes sur le site. Les informations publiées sont fournies à titre indicatif et ne sauraient engager la responsabilité du média.</p>
          <p>Le Nguu ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>4. Modifications</h2>
          <p>Le Nguu se réserve le droit de modifier les présentes conditions générales à tout moment et sans préavis. Les utilisateurs sont invités à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.</p>
        </div>
      </div>
    </main>
  );
}