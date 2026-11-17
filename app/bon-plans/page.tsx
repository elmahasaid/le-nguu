import Link from "next/link";

export default function BonPlansPage() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Fil d'Ariane */}
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Bons plans</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "10px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Bons plans & Partenaires
        </h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", color: "var(--mute)", marginBottom: "40px" }}>
          Retrouvez ici nos offres partenaires, nos recommandations et les services que nous soutenons.
        </p>

        {/* Grille pour les partenaires */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          
          {/* Bloc JUWU.FR */}
          <div style={{ padding: "30px", backgroundColor: "var(--paper)", border: "1px solid var(--rule)", borderRadius: "8px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", fontFamily: "Playfair Display, serif", color: "var(--green)", marginBottom: "15px" }}>
              Découvrez JUWU.FR
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "25px", color: "var(--mute)", lineHeight: "1.5" }}>
              Des tenues conçues pour ceux qui vivent le sport, repoussent leurs limites et affirment leur style.
              <br />
              Bienvenue dans l'univers JUWU.
            </p>
            <a 
              href="https://www.juwu.fr/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "block", width: "100%", backgroundColor: "var(--green)", color: "white", padding: "12px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}
            >
              Visiter la boutique
            </a>
          </div>

          {/* Bloc Nguzo Ya Msomo */}
          <div style={{ padding: "30px", backgroundColor: "var(--paper)", border: "1px solid var(--rule)", borderRadius: "8px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", fontFamily: "Playfair Display, serif", color: "var(--green)", marginBottom: "15px" }}>
              Nguzo Ya Msomo
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "25px", color: "var(--mute)", lineHeight: "1.5" }}>
              Soutenez l'éducation et l'avenir de la jeunesse comorienne. Découvrez les actions de l'association.
            </p>
            <a 
              href="https://www.nguzoyamsomo.fr/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "block", width: "100%", backgroundColor: "var(--green)", color: "white", padding: "12px", borderRadius: "4px", textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}
            >
              Découvrir l'association
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}