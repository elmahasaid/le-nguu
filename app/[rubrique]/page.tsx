// app/[rubrique]/page.tsx   ←  PAGE D'UNE RUBRIQUE (liste des articles, ou « aucun article »)
// Page d'une rubrique : /politique, /economie, /monde-afrique, etc.
// La liste des articles se construit toute seule à partir de content/articles/.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RUBRIQUES, findRubriqueBySlug } from "../lib/rubriques";
import { getArticlesByRubrique } from "../lib/articles";

type Params = { rubrique: string };

export function generateStaticParams() {
  return RUBRIQUES.map((r) => ({ rubrique: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  const { rubrique } = await params;
  const r = findRubriqueBySlug(rubrique);
  return r ? { title: `${r.name} - Le Nguu` } : {};
}

export default async function RubriquePage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const { rubrique } = await params;
  const r = findRubriqueBySlug(rubrique);
  if (!r) notFound();

  const articles = getArticlesByRubrique(r.slug);

  return (
    <main>
      <div className="wrap">
        <h1
          style={{
            fontFamily: "var(--font-baskerville), Georgia, serif",
            fontSize: "3rem",
            margin: "30px 0",
            borderBottom: "2px solid var(--ink)",
            paddingBottom: "10px",
          }}
        >
          {r.name}
        </h1>

        {articles.length === 0 ? (
          <p style={{ color: "var(--mute)", fontSize: "18px", padding: "10px 0 40px" }}>
            Aucun article dans cette rubrique pour le moment.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/${a.rubriqueSlug}/${a.slug}`} className="card">
                <div className="im" style={{ height: "200px", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.titre}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span className="tag" style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: 10 }}>
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
        )}
      </div>
    </main>
  );
}
