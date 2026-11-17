import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "./lib/articles";
import "./home.css";

/** Coupe un texte à environ `max` caractères, sans casser un mot. */
function excerpt(text: string, max = 230) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

export default function Home() {
  // La Une = l'article marqué "une: true" (sinon le plus récent).
  // À droite : les 4 articles suivants, du plus récent au plus ancien.
  const articles = getAllArticles();
  const hero = articles.find((a) => a.une) ?? articles[0];
  const others = articles.filter((a) => a !== hero).slice(0, 4);
  const columns =
    others.length >= 2 ? "minmax(0, 1.3fr) minmax(0, 1fr)" : others.length === 1 ? "minmax(0, 2fr) minmax(0, 1fr)" : "1fr";

  return (
    <main>
      <div className="wrap">
        {hero && (
          <section
            className="front"
            style={{ display: "grid", gridTemplateColumns: columns, gap: "20px" }}
          >
            {/* =========================
                GRANDE UNE
            ========================= */}
            <Link href={`/${hero.rubriqueSlug}/${hero.slug}`} className="hero">
              <img
                src={hero.image}
                alt={hero.titre}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: 0,
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />

              {/* Voile sombre pour améliorer la lisibilité */}
              <div className="hero-overlay" />

              <div className="hero-content">
                <span className="tag">{hero.categorie.toUpperCase()}</span>

                <h2
                  className="hero-title"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: "1.1", marginBottom: "15px" }}
                >
                  {hero.titre}
                </h2>

                <div className="hero-separator" />

                <p className="hero-excerpt" style={{ fontSize: "1.15rem", lineHeight: "1.5", marginBottom: "20px" }}>
                  {excerpt(hero.chapeau)}
                </p>

                <span className="more">
                  Lire l’article <span>→</span>
                </span>
              </div>
            </Link>

            {/* =========================
                ARTICLES SUIVANTS (grille à droite de la Une)
            ========================= */}
            {others.length > 0 && (
              <div className="news-grid" data-count={others.length}>
                {others.map((a) => (
                  <Link key={a.slug} href={`/${a.rubriqueSlug}/${a.slug}`} className="news-card">
                    <div className={`news-img${a.image === "/logo.png" ? " logo" : ""}`}>
                      <img src={a.image} alt={a.titre} />
                      <span className="news-tag">{a.categorie}</span>
                    </div>
                    <div className="news-txt">
                      <h3>{a.titre}</h3>
                      <span className="news-more">Lire l'article →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =========================
            DÉCRYPTAGE
        ========================= */}
        <section className="deco">
          <div>
            <div className="band">
              <h2>Décryptage</h2>
              <em>Analyser. Comprendre. Aller plus loin.</em>
            </div>

            <div className="art">
              <div className="th">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop"
                  alt="Economie"
                  width={330}
                  height={165}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>

              <div>
                <h3>Économie des Comores : quelles perspectives ?</h3>
                <p>Entre opportunités et défis, décryptage des enjeux économiques pour le pays.</p>
                <a className="more" href="#">
                  Lire l'analyse →
                </a>
              </div>
            </div>
          </div>

          <aside className="miss">
            <h2>À ne pas manquer</h2>
            <hr />

            <ul>
              <li><a href="#">Le calendrier des événements culturels</a></li>
              <li><a href="/football">Résultats du championnat comorien</a></li>
              <li><a href="#">Portrait : une femme qui inspire</a></li>
              <li><a href="#">Les clés pour réussir à l'étranger</a></li>
            </ul>
          </aside>
        </section>
      </div>

      {/* --- BANNIÈRE PARTENAIRE / SOUTIEN --- */}
      <div className="partner-banner">
        <div className="partner-container">
          <div className="partner-box">
            <h4>JUWU – Vêtements de sport</h4>
            <p>Découvrez nos maillots, tenues et collections sportives pour affirmer votre style sur et en dehors du terrain.</p>
            <a href="https://www.juwu.fr" target="_blank" rel="noopener noreferrer" className="partner-btn">
              Découvrir la collection
            </a>
          </div>

          

          <div className="partner-box">
            <h4>Soutenir Le Nguu</h4>
            <p>Aidez-nous à garder une information indépendante et de qualité.</p>
            <a href="#" className="partner-btn highlight">
              Faire un don
            </a>
          </div>

          <div className="partner-box">
            <h4>Nguzo Ya Msomo</h4>
            <p>Soutenez l'éducation et l'avenir de la jeunesse comorienne.</p>
            <a href="https://www.nguzoyamsomo.fr" target="_blank" rel="noopener noreferrer" className="partner-btn">
              Découvrir l'association
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
