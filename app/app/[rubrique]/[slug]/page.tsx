// app/[rubrique]/[slug]/page.tsx
// Page d'un article : /politique/etat-armee-peuple, /monde-afrique/iran-israel-usa, etc.
// Créée automatiquement pour chaque fichier de content/articles/.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "../../ArticleLayout";
import { getAllArticles, getArticle } from "../../lib/articles";

type Params = { rubrique: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ rubrique: a.rubriqueSlug, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params> | Params;
}): Promise<Metadata> {
  const { rubrique, slug } = await params;
  const a = getArticle(rubrique, slug);
  if (!a) return {};
  const description = a.chapeau.length > 180 ? `${a.chapeau.slice(0, 177)}…` : a.chapeau;
  return {
    title: `${a.titre} - Le Nguu`,
    description,
    openGraph: { title: a.titre, description, type: "article", images: [a.image] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const { rubrique, slug } = await params;
  const a = getArticle(rubrique, slug);
  if (!a) notFound();

  return (
    <ArticleLayout
      category={a.categorie}
      section={a.rubrique}
      title={a.titre}
      subtitle={a.soustitre}
      chapeau={a.chapeau}
      author={a.auteur}
      authorTitle={a.fonction}
      date={a.dateLabel}
      imageSrc={a.image}
      imageCaption={a.legende}
      imageCredit={a.credit}
    >
      {/* Le texte vient du fichier .md de l'article, converti en HTML */}
      <div dangerouslySetInnerHTML={{ __html: a.html }} />
    </ArticleLayout>
  );
}
