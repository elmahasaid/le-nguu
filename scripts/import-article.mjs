#!/usr/bin/env node
// scripts/import-article.mjs
// ---------------------------------------------------------------------
// Crée un article du site à partir d'un fichier Word (.docx), PDF, texte
// (.txt) ou Markdown (.md).
//
// Utilisation :
//   npm run article -- chemin/vers/mon-article.docx
//   npm run article -- mon-article.docx --rubrique politique --auteur "Prénom Nom"
//   npm run article -- --aide
//
// Rien n'est publié ailleurs : le script crée content/articles/<adresse>.md
// (et copie les images dans public/articles/<adresse>/).
// ---------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const PUBLIC_ARTICLES = path.join(ROOT, "public", "articles");

/* ===================================================================
   Outils (exportés pour les tests)
   =================================================================== */

export const normalize = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function slugify(s, max = 80) {
  let slug = normalize(s).replace(/ /g, "-");
  if (slug.length > max) {
    slug = slug.slice(0, max);
    const i = slug.lastIndexOf("-");
    if (i > 30) slug = slug.slice(0, i);
  }
  return slug || "article";
}

/** Rubriques : lues dans app/lib/rubriques.json (ou src/app/lib/...) */
export function loadRubriques() {
  for (const p of ["app/lib/rubriques.json", "src/app/lib/rubriques.json"]) {
    const full = path.join(ROOT, p);
    if (fs.existsSync(full)) return JSON.parse(fs.readFileSync(full, "utf8"));
  }
  throw new Error("Fichier app/lib/rubriques.json introuvable. Lancez la commande depuis le dossier du projet.");
}

export function findRubrique(value, rubriques) {
  const key = normalize(value).replace(/ /g, "-");
  return rubriques.find((r) => r.slug === key || normalize(r.name).replace(/ /g, "-") === key);
}

const MONTHS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const pad = (n) => String(n).padStart(2, "0");

function fmtDate(y, mo, d, h, mi) {
  const t = new Date(Date.UTC(y, mo - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return null; // ex. 31/02
  const base = `${y}-${pad(mo)}-${pad(d)}`;
  return h !== undefined && mi !== undefined ? `${base}T${pad(Number(h))}:${pad(Number(mi))}` : base;
}

/** "13/11/2026 06:00", "2026-11-13", "Le 13 novembre 2026 à 06h00" -> "2026-11-13T06:00" */
export function parseDate(input) {
  if (!input) return null;
  const s = String(input).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s]+(\d{1,2})[:hH](\d{2}))?/);
  if (m) return fmtDate(+m[1], +m[2], +m[3], m[4], m[5]);
  m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})(?:[,\sà]*(\d{1,2})[:hH](\d{2}))?/i);
  if (m) return fmtDate(+m[3], +m[2], +m[1], m[4], m[5]);
  m = s.match(/(\d{1,2})(?:er)?\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})(?:[,\sà]*(\d{1,2})[:hH](\d{2}))?/i);
  if (m) {
    const mo = MONTHS.indexOf(normalize(m[2])) + 1;
    if (mo) return fmtDate(+m[3], mo, +m[1], m[4], m[5]);
  }
  return null;
}

export function nowIso() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ----- Bloc d'informations en tête du document ----- */

const META_KEYS = {
  titre: "titre",
  "sous titre": "soustitre",
  soustitre: "soustitre",
  chapeau: "chapeau",
  chapo: "chapeau",
  rubrique: "rubrique",
  categorie: "categorie",
  auteur: "auteur",
  par: "auteur",
  fonction: "fonction",
  date: "date",
  legende: "legende",
  credit: "credit",
  "credit photo": "credit",
  image: "image",
  une: "une",
  slug: "slug",
};

const unescapeMd = (s) => s.replace(/\\([\\`*_{}\[\]()#+\-.!|>~])/g, "$1");

/**
 * Lit les lignes « Clé : valeur » placées tout en haut du document.
 * S'arrête à la première ligne qui n'en est pas une. Renvoie { meta, rest }.
 */
export function extractMeta(text) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const meta = {};
  let i = 0;
  let found = 0;
  while (i < lines.length) {
    const raw = lines[i];
    if (!raw.trim()) { i++; continue; }
    const cleaned = raw.trim().replace(/^[*_]{1,2}\s*/, ""); // "**Titre :** x" -> "Titre :** x"
    const m = cleaned.match(/^([^:\n]{2,30}?)\s*[*_]{0,2}\s*:\s*[*_]{0,2}\s*(.*)$/);
    const field = m ? META_KEYS[normalize(m[1])] : undefined;
    if (!field) break;
    const value = unescapeMd(m[2].replace(/[*_]{1,2}\s*$/, "").trim());
    if (value) meta[field] = value;
    found++;
    i++;
  }
  // séparateur éventuel entre le bloc et le texte
  while (i < lines.length && (!lines[i].trim() || /^(\*\s*){3,}$|^-{3,}$|^_{3,}$/.test(lines[i].trim()))) {
    if (found === 0 && lines[i].trim()) break;
    i++;
  }
  return { meta, rest: lines.slice(i).join("\n").trim() };
}

/** Texte brut (PDF, .txt) -> paragraphes Markdown. */
export function reflowText(text) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n").map((l) => l.replace(/\s+$/, ""));
  const nonEmpty = lines.filter((l) => l.trim());
  const blankSeparated = lines.join("\n").split(/\n\s*\n/).filter((p) => p.trim());

  let paragraphs;
  if (blankSeparated.length <= 3 && nonEmpty.length > 8) {
    // aucun saut de paragraphe exploitable : on en devine d'après la fin des phrases
    const maxLen = Math.max(...nonEmpty.map((l) => l.length));
    paragraphs = [];
    let cur = [];
    for (const l of nonEmpty) {
      cur.push(l.trim());
      if (/[.!?…»"”:]$/.test(l.trim()) && l.trim().length < maxLen * 0.75) {
        paragraphs.push(cur.join("\n"));
        cur = [];
      }
    }
    if (cur.length) paragraphs.push(cur.join("\n"));
  } else {
    paragraphs = blankSeparated;
  }

  return paragraphs
    .map((p) =>
      p
        .split("\n")
        .map((l) => l.trim())
        .join("\n")
        .replace(/-\n([a-zàâçéèêëîïôûùüÿœ])/g, "$1") // mot coupé en fin de ligne
        .replace(/\n/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");
}

const q = (s) => JSON.stringify(s); // une chaîne JSON est une chaîne YAML valide

export function buildFrontmatter(f) {
  const out = ["---", `titre: ${q(f.titre)}`];
  if (f.soustitre) out.push(`soustitre: ${q(f.soustitre)}`);
  out.push(`rubrique: ${q(f.rubrique)}`, `categorie: ${q(f.categorie)}`, `chapeau: ${q(f.chapeau)}`);
  out.push(`auteur: ${q(f.auteur)}`);
  if (f.fonction) out.push(`fonction: ${q(f.fonction)}`);
  out.push(`date: ${q(f.date)}`, `image: ${q(f.image)}`);
  if (f.legende) out.push(`legende: ${q(f.legende)}`);
  if (f.credit) out.push(`credit: ${q(f.credit)}`);
  if (f.une) out.push("une: true");
  if (f.brouillon) out.push("publie: false");
  out.push("---");
  return out.join("\n");
}

/* ===================================================================
   Lecture des fichiers
   =================================================================== */

async function docxToMarkdown(file, imgDirAbs, imgPrefix) {
  let mammoth, TurndownService;
  try {
    mammoth = (await import("mammoth")).default;
    TurndownService = (await import("turndown")).default;
  } catch {
    throw new Error("Modules manquants. Lancez une fois :  npm install -D mammoth turndown pdf-parse");
  }

  let n = 0;
  const { value: html, messages } = await mammoth.convertToHtml(
    { path: file },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Titre'] => h1:fresh",
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Titre 1'] => h2:fresh",
        "p[style-name='Titre 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Titre 3'] => h3:fresh",
        "p[style-name='Quote'] => blockquote:fresh",
        "p[style-name='Citation'] => blockquote:fresh",
      ],
      convertImage: mammoth.images.imgElement(async (image) => {
        const buf = await image.read();
        const ext =
          { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/svg+xml": "svg" }[
            image.contentType
          ] ?? "png";
        n += 1;
        fs.mkdirSync(imgDirAbs, { recursive: true });
        const name = `img-${n}.${ext}`;
        fs.writeFileSync(path.join(imgDirAbs, name), buf);
        return { src: `${imgPrefix}/${name}`, alt: image.altText ?? "" };
      }),
    }
  );

  const td = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
    hr: "---",
  });
  return { markdown: td.turndown(html), warnings: messages.filter((m) => m.type === "warning").map((m) => m.message) };
}

async function pdfToText(file) {
  let pdfParse;
  try {
    pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
  } catch {
    throw new Error("Module manquant. Lancez une fois :  npm install -D mammoth turndown pdf-parse");
  }
  const data = await pdfParse(fs.readFileSync(file));
  return data.text;
}

/* ===================================================================
   Programme principal
   =================================================================== */

const HELP = `
Importer un article (Word, PDF, texte ou Markdown)

  npm run article -- fichier.docx [options]

Le plus simple : placez ces lignes tout en haut du document Word, puis le texte dessous :

  Titre : ...
  Sous-titre : ...            (facultatif)
  Chapeau : ...               (sinon : le 1er paragraphe du texte)
  Rubrique : Politique
  Catégorie : Géopolitique    (facultatif, par défaut = la rubrique)
  Auteur : Prénom Nom
  Fonction : ...              (facultatif)
  Date : 13/11/2026 06:00     (facultatif, par défaut = maintenant)
  Légende : ...               (facultatif, légende de la photo)
  Crédit : ...                (facultatif, crédit photo)

Options (elles remplacent les lignes du document) :
  --titre --soustitre --chapeau --rubrique --categorie --auteur --fonction
  --date --legende --credit --slug
  --image <fichier ou /chemin>   photo principale (sinon : la 1re image du Word)
  --une          mettre l'article à la Une de l'accueil
  --brouillon    créer l'article sans le publier (publie: false)
  --force        remplacer un article qui existe déjà
`;

export async function main(argv = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      titre: { type: "string" }, soustitre: { type: "string" }, chapeau: { type: "string" },
      rubrique: { type: "string" }, categorie: { type: "string" }, auteur: { type: "string" },
      fonction: { type: "string" }, date: { type: "string" }, legende: { type: "string" },
      credit: { type: "string" }, slug: { type: "string" }, image: { type: "string" },
      une: { type: "boolean" }, brouillon: { type: "boolean" }, force: { type: "boolean" },
      aide: { type: "boolean" }, help: { type: "boolean" },
    },
  });

  if (values.aide || values.help || positionals.length === 0) {
    console.log(HELP);
    return values.aide || values.help ? 0 : 1;
  }

  const input = path.resolve(positionals[0]);
  if (!fs.existsSync(input)) throw new Error(`Fichier introuvable : ${input}`);
  const ext = path.extname(input).toLowerCase();
  if (![".docx", ".pdf", ".txt", ".md"].includes(ext)) {
    throw new Error(`Format « ${ext} » non pris en charge. Utilisez .docx, .pdf, .txt ou .md.`);
  }
  const warnings = [];
  const rubriques = loadRubriques();

  // Dossier temporaire pour les images du Word (renommé une fois l'adresse connue)
  const tmpName = `_import-${Date.now()}`;
  const tmpDir = path.join(PUBLIC_ARTICLES, tmpName);
  const tmpPrefix = `/articles/${tmpName}`;

  // 1. Lecture du contenu
  let rawText;
  let kind = "markdown";
  if (ext === ".docx") {
    const r = await docxToMarkdown(input, tmpDir, tmpPrefix);
    rawText = r.markdown;
    warnings.push(...r.warnings.map((w) => `Word : ${w}`));
  } else if (ext === ".pdf") {
    rawText = await pdfToText(input);
    kind = "text";
  } else if (ext === ".txt") {
    rawText = fs.readFileSync(input, "utf8");
    kind = "text";
  } else {
    rawText = fs.readFileSync(input, "utf8");
  }

  // 2. Informations en tête du document, puis options (qui ont priorité)
  const { meta, rest } = extractMeta(rawText);
  const get = (k) => values[k] ?? meta[k];
  let body = kind === "text" ? reflowText(rest) : rest;

  // Titre : option > ligne « Titre » > premier titre de niveau 1
  let titre = get("titre");
  if (!titre) {
    const m = body.match(/^#\s+(.+)$/m);
    if (m) { titre = m[1].trim(); body = body.replace(m[0], "").trim(); }
  }
  if (!titre) throw new Error("Titre introuvable. Ajoutez une ligne « Titre : ... » en haut du document, ou utilisez --titre.");

  // Rubrique (obligatoire : elle détermine l'adresse de l'article)
  const rubriqueInput = get("rubrique");
  if (!rubriqueInput) {
    throw new Error(`Rubrique manquante. Ajoutez « Rubrique : ... » en haut du document, ou --rubrique.\nRubriques possibles : ${rubriques.map((r) => r.name).join(", ")}`);
  }
  const rubrique = findRubrique(rubriqueInput, rubriques);
  if (!rubrique) {
    throw new Error(`Rubrique inconnue : « ${rubriqueInput} ».\nRubriques possibles : ${rubriques.map((r) => r.name).join(", ")}`);
  }

  // Adresse (slug)
  const slug = slugify(get("slug") ?? titre);
  const mdPath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (fs.existsSync(mdPath) && !values.force) {
    throw new Error(`L'article « ${slug} » existe déjà. Ajoutez --force pour le remplacer, ou --slug pour choisir une autre adresse.`);
  }

  // Chapeau : option > ligne « Chapeau » > premier paragraphe du texte
  let chapeau = get("chapeau");
  if (!chapeau) {
    const paras = body.split(/\n\s*\n/);
    const idx = paras.findIndex((p) => p.trim() && !/^(#|!\[|[-*]\s|>)/.test(p.trim()));
    if (idx >= 0) {
      chapeau = unescapeMd(paras[idx].replace(/\*\*|\*/g, "")).replace(/\s+/g, " ").trim();
      paras.splice(idx, 1);
      body = paras.join("\n\n").trim();
      warnings.push("Pas de ligne « Chapeau » : le premier paragraphe a été utilisé comme chapeau.");
    }
  }
  if (!chapeau) throw new Error("Chapeau introuvable. Ajoutez « Chapeau : ... » en haut du document, ou --chapeau.");

  // Auteur
  let auteur = get("auteur");
  if (!auteur) {
    auteur = "La rédaction";
    warnings.push("Pas d'auteur indiqué : « La rédaction » a été utilisé.");
  }

  // Date
  let date = parseDate(get("date"));
  if (get("date") && !date) warnings.push(`Date non reconnue (« ${get("date")} ») : la date du jour a été utilisée.`);
  if (!date) date = nowIso();

  // 3. Image principale : option/ligne « Image » > première image du Word
  const finalDir = path.join(PUBLIC_ARTICLES, slug);
  const finalPrefix = `/articles/${slug}`;
  let image = get("image");
  let imageFromBody = false;

  if (image && !image.startsWith("/") && !/^https?:\/\//.test(image)) {
    const src = path.resolve(image);
    if (!fs.existsSync(src)) throw new Error(`Image introuvable : ${src}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    const name = `cover${path.extname(src).toLowerCase() || ".jpg"}`;
    fs.copyFileSync(src, path.join(tmpDir, name));
    image = `${tmpPrefix}/${name}`;
  }
  if (!image) {
    const m = body.match(/^!\[[^\]]*\]\(([^)\s]+)[^)]*\)\s*$/m);
    if (m) {
      image = m[1];
      body = body.replace(m[0], "").replace(/\n{3,}/g, "\n\n").trim();
      imageFromBody = true;
    }
  }
  if (!image) {
    image = "/logo.png";
    warnings.push("Aucune image trouvée : /logo.png a été mis à la place. Ajoutez la photo avec --image ou une ligne « Image : ... ».");
  }

  // 4. Déplacer les images du dossier temporaire vers le dossier définitif
  if (fs.existsSync(tmpDir)) {
    if (fs.existsSync(finalDir)) {
      if (values.force) fs.rmSync(finalDir, { recursive: true, force: true });
      else throw new Error(`Le dossier public/articles/${slug} existe déjà (--force pour le remplacer).`);
    }
    fs.renameSync(tmpDir, finalDir);
    body = body.split(tmpPrefix).join(finalPrefix);
    image = image.split(tmpPrefix).join(finalPrefix);
    if (fs.readdirSync(finalDir).length === 0) fs.rmdirSync(finalDir);
  }

  // PDF : mise en forme perdue → brouillon par défaut
  const brouillon = values.brouillon || ext === ".pdf";
  if (ext === ".pdf") {
    warnings.push("PDF : le texte a été extrait sans mise en forme (pas d'intertitres, pas de gras, pas d'images). L'article est créé en brouillon : relisez-le, puis supprimez la ligne « publie: false ».");
  }

  // 5. Écriture
  const fm = buildFrontmatter({
    titre,
    soustitre: get("soustitre"),
    rubrique: rubrique.name,
    categorie: get("categorie") ?? rubrique.name,
    chapeau,
    auteur,
    fonction: get("fonction"),
    date,
    image,
    legende: get("legende"),
    credit: get("credit"),
    une: values.une || /^(oui|true|1)$/i.test(meta.une ?? ""),
    brouillon,
  });
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  fs.writeFileSync(mdPath, `${fm}\n\n${body}\n`, "utf8");

  // 6. Compte rendu
  console.log(`\n✓ Article créé : content/articles/${slug}.md`);
  console.log(`  Adresse      : /${rubrique.slug}/${slug}${brouillon ? "   (brouillon : non publié)" : ""}`);
  console.log(`  Rubrique     : ${rubrique.name}`);
  console.log(`  Auteur       : ${auteur}`);
  console.log(`  Date         : ${date}`);
  console.log(`  Image        : ${image}${imageFromBody ? "   (1re image du document)" : ""}`);
  console.log(`  Longueur     : environ ${body.split(/\s+/).filter(Boolean).length} mots`);
  if (warnings.length) {
    console.log("\nÀ vérifier :");
    for (const w of warnings) console.log(`  • ${w}`);
  }
  console.log("\nRelancez « npm run dev » (ou republiez le site) pour voir l'article.\n");
  return 0;
}

// Exécution directe (et non lors d'un import pour les tests)
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().then(
    (code) => process.exit(code ?? 0),
    (err) => {
      console.error(`\n✗ ${err.message}\n`);
      process.exit(1);
    }
  );
}
