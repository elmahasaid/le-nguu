import Link from "next/link";

export default function AideFAQ() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Aide (FAQ)</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Aide (FAQ)
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginTop: "30px", color: "var(--green)" }}>Puis-je commenter les articles sur le site ?</h3>
          <p>La section commentaires n'est pas encore ouverte sur Le Nguu. Nous privilégions pour l'instant un espace de débat serein et modéré sur nos réseaux sociaux (Facebook, TikTok, Instagram, YouTube). Vous pouvez réagir et nous interpeller directement sur ces plateformes.</p>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginTop: "30px", color: "var(--green)" }}>Comment proposer un article ou un sujet d'enquête ?</h3>
          <p>Vous avez une information, un témoignage ou un sujet d'enquête à nous partager ? Écrivez-nous à <strong>contact@lenguu.com</strong>. Notre équipe étudiera votre proposition avec attention. Nous garantissons la confidentialité de vos échanges et la protection de nos sources.</p>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginTop: "30px", color: "var(--green)" }}>Comment soumettre une revue, une analyse ou une tribune ?</h3>
          <p>Le Nguu ouvre ses colonnes aux chercheurs, universitaires et intellectuels. Pour proposer une tribune, une revue de littérature ou une analyse scientifique, merci d'envoyer votre texte (max. 5000 mots) accompagné d'une courte biographie et d'une photo à <strong>contact@lenguu.com</strong>. Les textes sont soumis à validation par notre comité de lecture.</p>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginTop: "30px", color: "var(--green)" }}>Comment signaler une erreur ou une coquille ?</h3>
          <p>La rigueur est au cœur de notre engagement. Si vous repérez une erreur factuelle, une coquille ou une information obsolète, signalez-la-nous à <strong>contact@lenguu.com</strong>. Nous apporterons les corrections nécessaires dans les plus brefs délais.</p>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginTop: "30px", color: "var(--green)" }}>Comment devenir partenaire ou annonceur ?</h3>
          <p>Pour toute demande de partenariat commercial, de mécénat ou de publicité, veuillez nous contacter à l'adresse : <strong>contact@lenguu.com</strong>. Nous étudions chaque proposition au cas par cas, en préservant toujours notre indépendance éditoriale.</p>
        </div>
      </div>
    </main>
  );
}