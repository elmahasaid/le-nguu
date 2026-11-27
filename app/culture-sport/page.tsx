// app/culture-sport/page.tsx
import Link from "next/link";
import Crumb from "../Crumb";
import { getArticlesByRubrique } from "../lib/articles";

// ---------------------------------------------------------------------
//  DOSSIERS SPORT : les cartes du haut de la page.
//  Pour en ajouter un, copiez un bloc { ... } et changez les textes.
//    - emoji : affiché en grand sur fond vert (en attendant une vraie image)
//    - image : chemin d'une image du dossier public/ (ex. "/can2027.png") ; remplace l'emoji
//    - badge : petit label rouge en haut à droite (facultatif)
//
//  ARTICLES : rien à faire. Tout article dont la rubrique est « Culture & Sport »
//  (dossier content/articles/) apparaît tout seul sous les dossiers.
// ---------------------------------------------------------------------
interface Dossier {
  href: string;
  title: string;
  text: string;
  cta: string;
  emoji?: string;
  image?: string;
  alt?: string;
  badge?: string;
}

const DOSSIERS: Dossier[] = [
  {
    href: "/football",
    emoji: "⚽",
    title: "Football comorien : Championnats et Coupes",
    text: "Classements, résultats et calendriers des trois îles.",
    cta: "Voir les classements →",
  },
  {
    href: "/basket",
    emoji: "🏀",
    title: "Basket-ball comorien : Championnats régionaux et national",
    text: "Classements et résultats des catégories Excellence, Honneur et Dames.",
    cta: "Voir les classements →",
  },
  {
    href: "/can-2027",
    image: "/can2027.png",
    alt: "Logo CAN 2027",
    badge: "Dossier Spécial",
    title: "Éliminatoires CAN 2027",
    text: "Classements des 12 groupes et résultats pour la phase finale.",
    cta: "Voir les classements →",
  },
];

export default function CultureSportPage() {
  // Articles de la rubrique « Culture & Sport », du plus récent au plus ancien
  const articles = getArticlesByRubrique("culture-sport");

  return (
    <main>
      <div className="wrap">
        <Crumb items={[{ label: "Culture & Sport" }]} fallbackHref="/" />

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', margin: '30px 0', borderBottom: '2px solid var(--ink)', paddingBottom: '10px' }}>
          Culture & Sport
        </h1>

        {/* Les dossiers sport */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {DOSSIERS.map((d) => (
            <Link key={d.href} href={d.href} className="card">
              <div className="im" style={{ height: '200px', position: 'relative', backgroundColor: '#0f3d2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.alt ?? d.title}
                    style={{ height: '100px', width: 'auto', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '80px' }}>{d.emoji}</span>
                )}

                <span className="tag" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>Sport</span>

                {d.badge && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e63946', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {d.badge}
                  </span>
                )}
              </div>
              <div className="b">
                <h3>{d.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--mute)', marginTop: '5px' }}>{d.text}</p>
                <span className="more">{d.cta}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Les articles de la rubrique (automatique) */}
        {articles.length > 0 && (
          <>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', margin: '44px 0 16px', borderBottom: '1px solid var(--rule)', paddingBottom: '8px' }}>
              Les derniers articles
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {articles.map((a) => (
                <Link key={a.slug} href={`/${a.rubriqueSlug}/${a.slug}`} className="card">
                  <div className="im" style={{ height: '200px', position: 'relative' }}>
                    <img
                      src={a.image}
                      alt={a.titre}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="tag" style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 10 }}>
                      {a.categorie}
                    </span>
                  </div>
                  <div className="b">
                    <h3>{a.titre}</h3>
                    <span className="more">Lire l'article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}