// app/football/data.ts
// =====================================================================
//  C'EST LE SEUL FICHIER À MODIFIER POUR METTRE À JOUR LA PAGE FOOTBALL
// =====================================================================
//
//  CLASSEMENT — une ligne par club, colonnes séparées par  |
//      Équipe | MJ | V | N | D | BM | BE
//      Djabal FC | 4 | 2 | 1 | 1 | 4 | 1
//  → les points (3 par victoire, 1 par nul) et la différence de buts
//    sont calculés automatiquement. Pour imposer les points (retrait,
//    forfait…), ajoutez-les en dernière colonne :  … | 4 | 1 | 6
//  → Vous pouvez aussi COPIER-COLLER directement un tableau Excel /
//    Google Sheets (colonnes Équipe, MJ, V, N, D, BM, BE) : ça marche.
//    (le fichier football-nguu-modele.xlsx prépare ces lignes pour vous)
//  → L'ordre du classement est celui que vous tapez (celui de la ligue).
//    Mettez  autoSort: true  pour qu'il soit calculé automatiquement.
//  → Un club qui a joué moins de matchs que les autres reçoit tout seul
//    la mention rouge « −1 » devant ses MJ.
//
//  MATCHS ET COUPES — une ligne par match
//      Tour | Date | Équipe domicile | Score | Équipe extérieur
//      Journée 5 | 15 nov. | Volcan Club | 2-1 | US Zilimadjou
//      Journée 6 | 22 nov. 15h30 | FC Malé | - | Djabal FC          ← pas encore joué
//      Finale | 24 mai | Angelus Club | 1-1 | Elan Club | 4-3      ← tirs au but
//
//  Une ligne qui commence par # est ignorée (commentaire).
//
//  LOGOS DES CLUBS — déposez l'image dans  public/clubs/  avec le nom
//  du club en minuscules, sans accent, séparé par des tirets :
//      Atomic Ngomé  →  public/clubs/atomic-ngome.png
//      FC Malé       →  public/clubs/fc-male.png
//  Sans logo, un rond avec les initiales du club s'affiche à la place.
//
//  COULEURS DES LIGNES (zones) — du haut vers le bas du classement :
//      { from: 1, type: "up",   label: "…" }            vert         (champion / qualifié)
//      { from: 10, type: "mid", label: "…" }            orange       (barrage)
//      { from: 11, to: 12, type: "down", label: "…" }   rouge foncé  (relégation)
//
//  COULEURS — Ngazidja = bleu, Ndzuani (Anjouan) = rouge, Mwali (Mohéli) = jaune,
//  National = vert Le Nguu. Elles se règlent dans ISLANDS et NATIONAL_THEME ci-dessous.
// =====================================================================

export type Island = "ngazidja" | "ndzuani" | "mwali";
export type ZoneType = "up" | "mid" | "down";

export interface Zone {
  from: number; // première place concernée (1 = leader)
  to?: number; // dernière place concernée (par défaut = from)
  type: ZoneType; // up = vert, mid = orange, down = rouge foncé
  label: string; // texte de la légende sous le tableau
}

export interface Division {
  label: string; // "Division 1"
  phase?: string; // "Classement J4"
  updated?: string; // "14 novembre 2026"
  table: string;
  matches: string;
  zones: Zone[];
  autoSort?: boolean;
}

export const SEASON = "2026-2027";

export const ISLAND_ORDER: Island[] = ["ngazidja", "ndzuani", "mwali"];

export const ISLANDS: Record<
  Island,
  { name: string; alt: string; color: string; dark: string; on: string }
> = {
  // color = couleur de l'île, dark = version foncée (titres), on = couleur du texte posé sur la couleur de l'île
  ngazidja: { name: "Ngazidja", alt: "Grande Comore", color: "#1d63c4", dark: "#123f85", on: "#ffffff" },
  ndzuani: { name: "Ndzuani", alt: "Anjouan", color: "#c62828", dark: "#8f1a20", on: "#ffffff" },
  mwali: { name: "Mwali", alt: "Mohéli", color: "#f5b800", dark: "#8a6a00", on: "#1a1300" },
};

// Le championnat national a sa propre couleur : le vert du Nguu
export const NATIONAL_THEME = { color: "#1f8a3c", dark: "#0f3d2e", on: "#ffffff" };

// Division vide, à remplir
const blank = (label: string, zones: Zone[] = []): Division => ({
  label,
  table: ``,
  matches: ``,
  zones,
});

// =====================================================================
//  CHAMPIONNATS PAR ÎLE
// =====================================================================
export const LEAGUES: Record<Island, Division[]> = {
  // ---------------------------------------------------------------
  //  NGAZIDJA — Division 1, 2026-2027, classement après la J4
  // ---------------------------------------------------------------
  ngazidja: [
    {
      label: "Division 1",
      phase: "Classement J4",
      updated: "", // ex. "14 novembre 2026"
      table: `
        Djabal FC          | 4 | 2 | 1 | 1 | 4 | 1
        Angelus Club       | 4 | 2 | 1 | 1 | 6 | 4
        Elan Club          | 3 | 2 | 1 | 0 | 2 | 0
        US Zilimadjou      | 4 | 2 | 1 | 1 | 4 | 3
        Etoile des Comores | 4 | 1 | 2 | 1 | 8 | 8
        Atomic Ngomé       | 4 | 1 | 2 | 1 | 5 | 5
        FC Chouani         | 4 | 1 | 2 | 1 | 4 | 4
        FC Malé            | 4 | 1 | 2 | 1 | 3 | 4
        FC Hantsindzi      | 4 | 1 | 1 | 2 | 4 | 4
        Amical Club        | 3 | 1 | 1 | 1 | 4 | 4
        Volcan Club        | 4 | 1 | 0 | 3 | 2 | 5
        Fekandza Club      | 4 | 1 | 0 | 3 | 2 | 6
      `,
      matches: ``,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 10, type: "mid", label: "Barrage de maintien contre le 3e de la Division 2" },
        { from: 11, to: 12, type: "down", label: "Relégation en Division 2" },
      ],
    },
    blank("Division 2"),
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  NDZUANI (Anjouan) — clubs à vérifier, tout est à 0 pour l'instant
  //  Pour ajouter les couleurs de lignes, remplacez  zones: []  par par ex. :
  //    zones: [
  //      { from: 1, type: "up", label: "Champion" },
  //      { from: 9, to: 10, type: "down", label: "Relégation en Division 2" },
  //    ],
  // ---------------------------------------------------------------
  ndzuani: [
    {
      label: "Division 1",
      phase: "Classement",
      updated: "",
      table: `
        Gombessa Sport         | 0 | 0 | 0 | 0 | 0 | 0
        Steal Nouvel           | 0 | 0 | 0 | 0 | 0 | 0
        FC Djomakawé Ongojou   | 0 | 0 | 0 | 0 | 0 | 0
        Mrango Club            | 0 | 0 | 0 | 0 | 0 | 0
        Komorozine de Domoni   | 0 | 0 | 0 | 0 | 0 | 0
        Beressé Club           | 0 | 0 | 0 | 0 | 0 | 0
        Ngazi Sport            | 0 | 0 | 0 | 0 | 0 | 0
        Chirazienne FC         | 0 | 0 | 0 | 0 | 0 | 0
        Étoile d'or            | 0 | 0 | 0 | 0 | 0 | 0
        FC Daouéni             | 0 | 0 | 0 | 0 | 0 | 0
      `,
      matches: ``,
      zones: [],
    },
    blank("Division 2"),
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  MWALI (Mohéli) — clubs à vérifier, tout est à 0 pour l'instant
  //  Même principe pour les couleurs de lignes (voir Ndzuani ci-dessus).
  // ---------------------------------------------------------------
  mwali: [
    {
      label: "Division 1",
      phase: "Classement",
      updated: "",
      table: `
        Fomboni FC          | 0 | 0 | 0 | 0 | 0 | 0
        Ouragan Club        | 0 | 0 | 0 | 0 | 0 | 0
        Étoile du Centre    | 0 | 0 | 0 | 0 | 0 | 0
        FC Belle Lumière    | 0 | 0 | 0 | 0 | 0 | 0
        Nouvel Espoir       | 0 | 0 | 0 | 0 | 0 | 0
        Wemani FC           | 0 | 0 | 0 | 0 | 0 | 0
        Silex FC            | 0 | 0 | 0 | 0 | 0 | 0
        Kangani Club        | 0 | 0 | 0 | 0 | 0 | 0
      `,
      matches: ``,
      zones: [],
    },
    blank("Division 2"),
    blank("Division 3"),
  ],
};

// =====================================================================
//  CHAMPIONNAT NATIONAL (phase nationale entre les champions des îles)
// =====================================================================
export const NATIONAL_LEAGUE = {
  champion: "", // ex. "Djabal FC" — s'affiche en bandeau si rempli
  updated: "",
  table: ``,
  matches: ``,
  zones: [{ from: 1, type: "up", label: "Champion des Comores" }] as Zone[],
};

// =====================================================================
//  COUPES DES COMORES
// =====================================================================
// Phase régionale : une coupe par île (une ligne par match, voir le format plus haut)
export const REGIONAL_CUPS: Record<Island, string> = {
  ngazidja: ``,
  ndzuani: ``,
  mwali: ``,
};

// Phase nationale
export const NATIONAL_CUP = {
  holder: "", // tenant du titre — s'affiche en bandeau si rempli
  matches: ``,
};
