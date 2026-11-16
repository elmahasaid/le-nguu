// app/football/parse.ts
// Transforme le texte saisi dans data.ts en données prêtes à afficher.
// Vous n'avez normalement JAMAIS besoin de modifier ce fichier.

export interface Standing {
  club: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number | null; // buts marqués (BM), null si inconnu
  ga: number | null; // buts encaissés (BE), null si inconnu
  diff: number; // différence de buts
  points: number;
}

export interface Match {
  round?: string;
  date: string;
  home: string;
  away: string;
  scoreHome?: number;
  scoreAway?: number;
  pens?: string;
}

const SPLIT = /\t|\||;/; // séparateurs acceptés : | ou ; ou tabulation (copier-coller Excel)

const skip = (line: string) =>
  !line || line.startsWith("#") || line.startsWith("//");

/**
 * Format d'une ligne de classement :
 *   Équipe | MJ | V | N | D | BM | BE                 (Pts calculés : 3 par victoire, 1 par nul)
 *   Équipe | MJ | V | N | D | BM | BE | Pts           (Pts imposés, ex. retrait de points)
 *   Équipe | MJ | V | N | D | - | - | Pts | Diff      (buts inconnus : tirets, puis points et différence)
 * La première ligne peut être un en-tête (Équipe | MJ | V …) : elle est ignorée.
 */
export function parseStandings(text: string): Standing[] {
  const rows: Standing[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (skip(line)) continue;
    const p = line.split(SPLIT).map((s) => s.trim());
    if (p.length < 7) continue;
    if (Number.isNaN(Number(p[1]))) continue; // ligne d'en-tête
    // accepte le vrai signe moins (−) et le tiret long (–)
    const num = (i: number): number | null => {
      const t = (p[i] ?? "").replace(/[\u2212\u2013]/g, "-").replace(/\s/g, "");
      if (t === "" || t === "-") return null;
      const v = Number(t);
      return Number.isFinite(v) ? v : null;
    };
    const n = (i: number) => num(i) ?? 0;
    const won = n(2);
    const drawn = n(3);
    const gf = num(5);
    const ga = num(6);
    const imposedDiff = num(8);
    rows.push({
      club: p[0],
      played: n(1),
      won,
      drawn,
      lost: n(4),
      gf,
      ga,
      diff: imposedDiff ?? (gf !== null && ga !== null ? gf - ga : 0),
      points: num(7) ?? won * 3 + drawn,
    });
  }
  return rows;
}

/**
 * Format d'une ligne de match :
 *   Tour | Date | Équipe domicile | Score | Équipe extérieur
 *   Tour | Date | Équipe domicile | Score | Équipe extérieur | Tirs au but
 * - Score : 2-1   (laisser "-" ou vide si le match n'est pas encore joué)
 * - Date  : texte libre, ex. "15 nov." ou "22 nov. 15h30"
 * - Les lignes ayant le même "Tour" se regroupent automatiquement.
 */
export function parseMatches(text: string): Match[] {
  const out: Match[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (skip(line)) continue;
    const p = line.split(SPLIT).map((s) => s.trim());
    if (p.length < 5) continue;
    const [round, date, home, score, away, pens] = p;
    const m = score.match(/^(\d+)\s*[-–:]\s*(\d+)$/);
    out.push({
      round: round || undefined,
      date,
      home,
      away,
      scoreHome: m ? Number(m[1]) : undefined,
      scoreAway: m ? Number(m[2]) : undefined,
      pens: pens || undefined,
    });
  }
  return out;
}

/** "Atomic Ngomé" -> "atomic-ngome" (nom du fichier logo : public/clubs/atomic-ngome.png) */
export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function sortStandings(rows: Standing[]) {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.diff !== a.diff) return b.diff - a.diff;
    return (b.gf ?? 0) - (a.gf ?? 0);
  });
}
