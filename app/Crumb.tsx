import Link from "next/link";
import BackButton from "./BackButton";

export interface CrumbItem {
  label: string;
  href?: string; // sans href = page actuelle (affichée sans lien)
}

/**
 * Fil d'Ariane + bouton « Retour », comme sur les articles.
 *
 * Utilisation :
 *   <Crumb items={[{ label: "Culture & Sport", href: "/culture-sport" }, { label: "Football" }]}
 *          fallbackHref="/culture-sport" />
 * donne :  Accueil › Culture & Sport › Football                    [← Retour]
 */
export default function Crumb({
  items,
  fallbackHref = "/",
}: {
  items: CrumbItem[];
  fallbackHref?: string; // où mène « Retour » si la page a été ouverte directement
}) {
  return (
    <div className="ar-crumb pg" aria-label="Fil d'Ariane">
      <Link href="/">Accueil</Link>
      {items.map((it) => (
        <span key={it.label} className="ar-crumb-item">
          <span aria-hidden>›</span>
          {it.href ? (
            <Link href={it.href}>{it.label}</Link>
          ) : (
            <span className="ar-crumb-here" aria-current="page">
              {it.label}
            </span>
          )}
        </span>
      ))}
      <BackButton fallbackHref={fallbackHref} />
    </div>
  );
}
