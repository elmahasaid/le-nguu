// app/lib/articles.ts
// Lit les articles du dossier content/articles/ (un fichier .md par article).
// Les fichiers dont le nom commence par "_" (ex. _modele.md) sont ignorés.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { findRubrique } from "./rubriques";

const DIR = path.join(process.cwd(), "content", "articles");

export interface Article {
  slug: string; // nom du fichier sans .md
  rubrique: string; // "Monde / Afrique"
  rubriqueSlug: string; // "monde-afrique"
  categorie: string; // étiquette au-dessus du titre ("Géopolitique")
  titre: string;
  soustitre?: string;
  chapeau: string;
  auteur: string;
  fonction?: string;
  date: string; // "2026-11-13" ou "2026-11-13T06:00"
  dateLabel: string; // "Le 13 novembre 2026 à 06h00"
  image: string;
  legende?: string;
  credit?: string;
  une: boolean;
  html: string; // corps de l'article converti en HTML
}

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Accepte "2026-11-13", "2026-11-13T06:00", "2026-11-13 06:00" ou une date lue par le YAML. */
function parseDateValue(v: unknown): string | null {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    const d = `${v.getUTCFullYear()}-${pad(v.getUTCMonth() + 1)}-${pad(v.getUTCDate())}`;
    return v.getUTCHours() || v.getUTCMinutes()
      ? `${d}T${pad(v.getUTCHours())}:${pad(v.getUTCMinutes())}`
      : d;
  }
  if (typeof v === "string") {
    const m = v.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s]+(\d{1,2}):(\d{2}))?/);
    if (m) return m[4] ? `${m[1]}-${m[2]}-${m[3]}T${pad(Number(m[4]))}:${m[5]}` : `${m[1]}-${m[2]}-${m[3]}`;
  }
  return null;
}

export function formatDateLabel(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return iso;
  const day = Number(m[3]);
  const base = `Le ${day === 1 ? "1er" : day} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
  return m[4] ? `${base} à ${m[4]}h${m[5]}` : base;
}

const str = (v: unknown) =>
  typeof v === "string" && v.trim() ? v.trim() : undefined;

function loadFile(file: string): Article | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/i, "");

  if (data.publie === false) return null; // brouillon : non publié

  const titre = str(data.titre);
  const chapeau = str(data.chapeau);
  const rubriqueName = str(data.rubrique);
  const image = str(data.image);
  const missing = [
    !titre && "titre",
    !chapeau && "chapeau",
    !rubriqueName && "rubrique",
    !image && "image",
  ].filter(Boolean);
  if (missing.length) {
    console.warn(`[articles] "${file}" ignoré : il manque ${missing.join(", ")}.`);
    return null;
  }

  const rub = findRubrique(rubriqueName!);
  if (!rub) {
    console.warn(`[articles] "${file}" ignoré : rubrique inconnue « ${rubriqueName} ».`);
    return null;
  }

  const date =
    parseDateValue(data.date) ??
    fs.statSync(path.join(DIR, file)).mtime.toISOString().slice(0, 10);

  return {
    slug,
    rubrique: rub.name,
    rubriqueSlug: rub.slug,
    categorie: str(data.categorie) ?? rub.name,
    titre: titre!,
    soustitre: str(data.soustitre),
    chapeau: chapeau!,
    auteur: str(data.auteur) ?? "La rédaction",
    fonction: str(data.fonction),
    date,
    dateLabel: formatDateLabel(date),
    image: image!,
    legende: str(data.legende),
    credit: str(data.credit),
    une: data.une === true,
    html: marked.parse(content, { async: false }) as string,
  };
}

let cache: Article[] | null = null;

/** Tous les articles publiés, du plus récent au plus ancien. */
export function getAllArticles(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => /\.md$/i.test(f) && !f.startsWith("_"))
    : [];
  const list = files
    .map(loadFile)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = list;
  return list;
}

export const getArticle = (rubriqueSlug: string, slug: string) =>
  getAllArticles().find((a) => a.rubriqueSlug === rubriqueSlug && a.slug === slug);

export const getArticlesByRubrique = (rubriqueSlug: string) =>
  getAllArticles().filter((a) => a.rubriqueSlug === rubriqueSlug);
