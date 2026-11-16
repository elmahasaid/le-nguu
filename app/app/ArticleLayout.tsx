import Link from "next/link";
import { ReactNode } from "react";
import WeatherWidget from "./WeatherWidget";

interface ArticleLayoutProps {
  category: string;
  section?: string; // facultatif : rubrique du site, sert uniquement au lien et au fil d'Ariane
  title: string;
  subtitle?: string; // facultatif : ne s'affiche que s'il est renseigné
  chapeau: string;
  author: string;
  authorTitle?: string;
  date?: string;
  imageSrc: string;
  imageCaption?: string;
  imageCredit?: string; // facultatif : ne s'affiche que s'il est renseigné
  children: ReactNode;
}

// "Monde / Afrique" -> "monde-afrique", "Économie" -> "economie"
const toSlug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* Couleurs harmonisées : blanc pur, gris clair, vert foncé Le Nguu */
const BLANC = "#ffffff";
const BEIGE = "#fbf9f4"; // fond beige d'origine qui sépare l'article du reste de la page
const GRIS_CLAIR = "#e5e7eb";
const VERT_NGUU = "#0f3d2e";

export default function ArticleLayout({
  category,
  section,
  title,
  subtitle,
  chapeau,
  author,
  authorTitle,
  date = "Le 13 novembre 2026 à 06h00",
  imageSrc,
  imageCaption,
  imageCredit,
  children,
}: ArticleLayoutProps) {
  const sectionName = section ?? category;

  return (
    <main style={{ backgroundColor: BLANC, minHeight: '100vh' }}>

      <div className="wrap art-wrap" style={{ paddingTop: '20px' }}>
        {/* Fil d'Ariane */}
        <div className="art-crumb" style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--mute)', fontFamily: 'Source Sans 3, sans-serif' }}>
          <Link href="/" style={{ textDecoration: 'underline' }}>Accueil</Link> &gt;
          <Link href={`/${toSlug(sectionName)}`} style={{ textDecoration: 'underline', marginLeft: '5px' }}>{sectionName}</Link>
        </div>

        {/* LE CONTENEUR BEIGE QUI ENTOURE TOUT */}
        <div className="art-shell" style={{
          backgroundColor: BEIGE,
          padding: '30px',
          borderRadius: '8px',
          border: `1px solid ${GRIS_CLAIR}`
        }}>

          {/* LA GRILLE : Article (2/3) + Pubs (1/3) */}
          <div className="art-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '40px', alignItems: 'start' }}>

            {/* --- COLONNE DE GAUCHE : L'ARTICLE --- */}
            <article className="art-article" style={{
              backgroundColor: BLANC,
              padding: '40px',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>

              <header className="art-header" style={{ marginBottom: '30px' }}>
                <span className="art-kicker" style={{ color: VERT_NGUU, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>
                  {category}
                </span>
                <h1 className="art-title" style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#0f1012',
                  margin: '10px 0 15px 0'
                }}>
                  {title}
                </h1>
                {subtitle && (
                  <p style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '22px',
                    lineHeight: 1.3,
                    color: '#4a5568',
                    margin: '0 0 15px 0'
                  }}>
                    {subtitle}
                  </p>
                )}
                <p className="art-chapeau" style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '20px',
                  lineHeight: 1.5,
                  color: '#4a5568',
                  marginBottom: '20px'
                }}>
                  {chapeau}
                </p>

                <div className="art-meta" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${GRIS_CLAIR}`,
                  borderBottom: `1px solid ${GRIS_CLAIR}`,
                  padding: '15px 0',
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '15px',
                  color: '#0f1012'
                }}>
                  <div>
                    Par <strong>{author}</strong><br />
                    {authorTitle && <span style={{ fontSize: '13px', color: '#5b5f66' }}>{authorTitle}</span>}
                  </div>
                  <div style={{ fontSize: '13px', color: '#5b5f66' }}>
                    {date}
                  </div>
                </div>
              </header>

              <div className="art-image" style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: GRIS_CLAIR, marginBottom: '10px' }}>
                <img
                  src={imageSrc}
                  alt={title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {(imageCaption || imageCredit) && (
                <p className="art-caption" style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '13px',
                  color: '#5b5f66',
                  marginBottom: '30px',
                  fontStyle: 'italic'
                }}>
                  {imageCaption}{imageCaption && imageCredit ? " " : ""}{imageCredit && `Crédit : ${imageCredit}`}
                </p>
              )}

              <div className="art-body" style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '19px',
                lineHeight: 1.6,
                color: '#1a202c'
              }}>
                {children}
              </div>
            </article>

            {/* --- COLONNE DE DROITE : LES PUBS --- */}
            <aside className="art-aside" style={{ position: 'sticky', top: '100px' }}>

              <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: BLANC, border: `1px solid ${GRIS_CLAIR}`, borderRadius: '4px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '18px', fontFamily: 'Playfair Display, serif', color: VERT_NGUU, marginBottom: '10px' }}>Découvrez JUWU.FR</h4>
                <p style={{ fontSize: '13px', marginBottom: '15px', color: '#5b5f66' }}>La boutique en ligne des Comores.</p>
                <a href="https://www.juwu.fr" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: VERT_NGUU, color: 'white', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Visiter la boutique
                </a>
              </div>

              <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: BLANC, border: `1px solid ${GRIS_CLAIR}`, borderRadius: '4px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '18px', fontFamily: 'Playfair Display, serif', color: VERT_NGUU, marginBottom: '10px' }}>Nguzo Ya Msomo</h4>
                <p style={{ fontSize: '13px', marginBottom: '15px', color: '#5b5f66' }}>Soutenez l'éducation et la jeunesse.</p>
                <a href="https://www.nguzoyamsomo.fr" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: VERT_NGUU, color: 'white', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Découvrir
                </a>
              </div>

              <div style={{ padding: '20px', backgroundColor: BLANC, border: `1px solid ${GRIS_CLAIR}`, borderRadius: '4px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '18px', fontFamily: 'Playfair Display, serif', color: VERT_NGUU, marginBottom: '10px' }}>Soutenir Le Nguu</h4>
                <p style={{ fontSize: '13px', marginBottom: '15px', color: '#5b5f66' }}>Aidez-nous à rester indépendants.</p>
                <a href="#" style={{ display: 'block', width: '100%', backgroundColor: VERT_NGUU, color: 'white', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Faire un don
                </a>
              </div>

              <WeatherWidget />

            </aside>

          </div>
        </div>
      </div>
    </main>
  );
}
