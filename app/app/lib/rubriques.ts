// app/lib/rubriques.ts
// Les rubriques du journal (celles du menu). La liste est dans rubriques.json,
// partagée avec le script d'import : pour ajouter une rubrique, modifiez ce fichier JSON
// (et ajoutez-la aussi dans le menu de Header.tsx et MobileHeader.tsx).
import list from "./rubriques.json";

export interface Rubrique {
  name: string; // "Monde / Afrique"
  slug: string; // "monde-afrique" (adresse : /monde-afrique)
}

export const RUBRIQUES: Rubrique[] = list;

/** "Économie" -> "economie", "Culture & Sport" -> "culture-sport" */
export const toSlug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const findRubriqueBySlug = (slug: string) =>
  RUBRIQUES.find((r) => r.slug === slug);

/** Retrouve une rubrique à partir de son nom OU de son adresse, sans tenir compte des accents ni des majuscules. */
export const findRubrique = (value: string) => {
  const key = toSlug(value);
  return RUBRIQUES.find((r) => r.slug === key || toSlug(r.name) === key);
};
