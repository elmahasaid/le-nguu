import Link from "next/link";

export default function CharteDuGroupe() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Charte du Groupe</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          Charte du Groupe
        </h1>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", lineHeight: "1.7" }}>
          <p><em>Le Nguu est un média indépendant né de la volonté de proposer une information de qualité, rigoureuse et engageante sur les Comores, sa diaspora, l'Afrique et le monde. Cette charte définit les principes fondamentaux qui guident notre travail au quotidien.</em></p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>1. Notre mission</h2>
          <p>Informer, éclairer et rassembler. Nous croyons que l'accès à une information libre et fiable est la pierre angulaire de toute démocratie. Notre mission est de couvrir l'actualité politique, économique, sociale et culturelle de l'archipel, mais aussi les grands enjeux du continent africain et de la scène internationale, avec honnêteté et précision.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>2. Indépendance éditoriale</h2>
          <p>Le Nguu est totalement indépendant de toute influence politique, économique ou idéologique. Nos choix éditoriaux ne sont dictés que par l'intérêt du public et la recherche de la vérité. Aucune pression extérieure, d'où qu'elle vienne, ne saurait altérer notre ligne éditoriale.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>3. Rigueur et vérification des sources</h2>
          <p>Chaque information publiée fait l'objet d'un travail minutieux de vérification. Nous recoupons nos sources, nous confrontons les points de vue et nous corrigeons nos erreurs publiquement lorsque cela s'avère nécessaire. La transparence est notre engagement le plus cher.</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginTop: "30px", color: "var(--green)" }}>4. Pluralité des opinions</h2>
          <p>Nous donnons la parole à toutes les sensibilités, dans le respect du débat démocratique. Les tribunes et contributions extérieures sont clairement identifiées et n'engagent que leurs auteurs.</p>
        </div>
      </div>
    </main>
  );
}