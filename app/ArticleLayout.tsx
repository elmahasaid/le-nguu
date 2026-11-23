import Link from "next/link";
import { ReactNode } from "react";
import WeatherWidget from "./WeatherWidget";
import BackButton from "./BackButton";

interface ArticleLayoutProps {
  category: string; // étiquette au-dessus du titre (ex. « Géopolitique »)
  section?: string; // facultatif : rubrique du site (ex. « Monde / Afrique »), sert au lien et au fil d'Ariane
  title: string;
  subtitle?: string; // facultatif : sous-titre sous le titre
  chapeau: string;
  author: string;
  authorTitle?: string;
  date?: string;
  imageSrc: string;
  imageCaption?: string;
  imageCredit?: string; // facultatif : crédit photo, ex. "Nom du photographe / AFP"
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
  const categoryHref = `/${toSlug(sectionName)}`;

  return (
    <main className="ar-page">
      <div className="ar-wrap">
        {/* Fil d'Ariane */}
        <div className="ar-crumb">
          <Link href="/">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href={categoryHref}>{sectionName}</Link>
          <BackButton fallbackHref={categoryHref} />
        </div>

        <div className="ar-grid">
          {/* ---------- ARTICLE ---------- */}
          <article className="ar-main">
            <div className="ar-head">
              <Link href={categoryHref} className="ar-cat">
                {category}
              </Link>

              <h1 className="ar-title">{title}</h1>

              {subtitle && <p className="ar-sub">{subtitle}</p>}

              <p className="ar-chapeau">{chapeau}</p>

              <div className="ar-by">
                <div>
                  <span>
                    Par <strong>{author}</strong>
                  </span>
                  {authorTitle && <span className="ar-by-role">{authorTitle}</span>}
                </div>
                <time className="ar-by-date">{date}</time>
              </div>
            </div>

            <figure className="ar-fig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ar-img" src={imageSrc} alt={title} />
              {(imageCaption || imageCredit) && (
                <figcaption>
                  {imageCaption && <span className="ar-cap">{imageCaption}</span>}
                  {imageCredit && <span className="ar-credit">Crédit : {imageCredit}</span>}
                </figcaption>
              )}
            </figure>

            <div className="ar-body">{children}</div>
          </article>

          {/* ---------- COLONNE LATÉRALE ---------- */}
          <div className="ar-side" role="complementary" aria-label="Services et partenaires">
            <section className="ar-block">
              <h2 className="ar-block-title">Découvrez JUWU.FR</h2>
              <p className="ar-block-text">La boutique en ligne des Comores.</p>
              <a
                href="https://www.juwu.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="ar-btn ar-btn-line"
              >
                Visiter la boutique
              </a>
            </section>

            <section className="ar-block">
              <h2 className="ar-block-title">Nguzo Ya Msomo</h2>
              <p className="ar-block-text">Soutenez l'éducation et la jeunesse.</p>
              <a
                href="https://www.nguzoyamsomo.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="ar-btn ar-btn-line"
              >
                Découvrir
              </a>
            </section>

            <section className="ar-block">
              <h2 className="ar-block-title">Soutenir Le Nguu</h2>
              <p className="ar-block-text">Aidez-nous à rester indépendants.</p>
              <a href="#" className="ar-btn ar-btn-solid">
                Faire un don
              </a>
            </section>

            <WeatherWidget />
          </div>
        </div>
      </div>
    </main>
  );
}
