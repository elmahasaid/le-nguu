import Link from "next/link";

export default function MentionsLegales() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Mentions légales</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Mentions légales
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>1. Éditeur du site</h2>
          <p>Le site <strong>Le Nguu</strong> est un média en ligne indépendant dédié à l'actualité des Comores, de sa diaspora, de l'Afrique et du monde. Il est édité par l'équipe éditoriale du Nguu.</p>
            <p><strong>Contact :</strong> contact@lenguu.com</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>2. Hébergement</h2>
          <p>Le site est hébergé par la société <strong>Vercel Inc.</strong>, dont le siège social est situé au 440 N Barranca Ave #4133 Covina, CA 91723, États-Unis. Vercel assure la disponibilité technique et la sécurité des serveurs hébergeant nos contenus.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>3. Propriété intellectuelle</h2>
          <p>L'ensemble des contenus présents sur le site Le Nguu (textes, articles, photographies, illustrations, logos, vidéos, bases de données) est la propriété exclusive du Nguu ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable du Nguu.</p>
          <p>Toute exploitation non autorisée du site ou de son contenu est constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>4. Liens hypertextes</h2>
          <p>Le site Le Nguu contient des liens hypertextes vers d'autres sites (partenaires, sources d'information). Le Nguu n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques en matière de protection des données.</p>
        </div>
      </div>
    </main>
  );
}