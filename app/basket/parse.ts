// app/basket/parse.ts
// Lecture des classements de basket saisis en texte dans data.ts.
// Vous n'avez normalement JAMAIS besoin de modifier ce fichier.

export interface BasketStanding {
  club: string;
  played: number; // matchs joués
  won: number; // victoires
  lost: number; // défaites (forfaits compris)
  forfeits: number; // forfaits
  points: number;
  pf: number | null; // points marqués, null si inconnu
  pa: number | null; // points encaissés, null si inconnu
  avg: number; // points average (marqués - encaissés)
}

const SPLIT = /\t|\||;/; // séparateurs acceptés : | ou ; ou tabulation (copier-coller Excel)

const skip = (line: string) =>
  !line || line.startsWith("#") || line.startsWith("//");

/**
 * Format d'une ligne (même ordre que le tableau Excel de la ligue) :
 *   Équipe | MJ | V | D | F | Pts | PM | PE | Moy
 *
 * - F = forfaits (déjà comptés dans les défaites D).
 * - Pts, PM, PE et Moy sont facultatifs :
 *     Pts vide -> calculé : 2 points par victoire, 1 par défaite, 0 par forfait
 *     Moy vide -> calculée : PM - PE
 * - Si PM / PE sont inconnus, mettez un tiret et donnez la moyenne dans « Moy ».
 * La première ligne peut être un en-tête (Équipe | MJ | V …) : elle est ignorée.
 */
export function parseBasketStandings(text: string): BasketStanding[] {
  const rows: BasketStanding[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (skip(line)) continue;
    const p = line.split(SPLIT).map((s) => s.trim());
    if (p.length < 5) continue;
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
    const lost = n(3);
    const forfeits = n(4);
    const pf = num(6);
    const pa = num(7);
    rows.push({
      club: p[0],
      played: num(1) ?? won + lost,
      won,
      lost,
      forfeits,
      points: num(5) ?? 2 * won + (lost - forfeits),
      pf,
      pa,
      avg: num(8) ?? (pf !== null && pa !== null ? pf - pa : 0),
    });
  }
  return rows;
}

/** Tri automatique : points, puis points average, puis points marqués. */
export function sortBasket(rows: BasketStanding[]) {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.avg !== a.avg) return b.avg - a.avg;
    return (b.pf ?? 0) - (a.pf ?? 0);
  });
}
