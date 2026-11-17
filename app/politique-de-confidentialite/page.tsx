import Link from "next/link";

export default function PolitiqueConfidentialite() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Politique de confidentialité</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Politique de confidentialité
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <p><strong>Le Nguu</strong> accorde une importance capitale à la protection de votre vie privée. La présente politique détaille quelles données nous collectons, comment nous les utilisons et quels sont vos droits.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>1. Collecte des données</h2>
          <p>Nous collectons uniquement les données strictement nécessaires à la fourniture de nos services :</p>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li>Les données que vous nous fournissez volontairement (formulaire de contact, inscription à la newsletter, proposition d'article).</li>
            <li>Les données de navigation (pages visitées, temps de lecture) de manière anonymisée pour améliorer nos contenus.</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>2. Utilisation des données</h2>
          <p>Vos données ne seront jamais revendues ou cédées à des tiers à des fins commerciales. Elles sont utilisées exclusivement pour :</p>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li>Répondre à vos demandes de contact.</li>
            <li>Vous envoyer nos newsletters si vous y avez souscrit.</li>
            <li>Analyser l'audience du site de manière agrégée et anonyme.</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>3. Vos droits</h2>
          <p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : <strong>contact@lenguu.com</strong>. Nous nous engageons à répondre dans un délai maximum de 30 jours.</p>
        </div>
      </div>
    </main>
  );
}