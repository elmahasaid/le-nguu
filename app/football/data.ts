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
//  → Si les buts marqués / encaissés ne sont pas connus, mettez un tiret à la
//    place de BM et BE, puis donnez les points et la différence de buts :
//      Mrango Club | 4 | 3 | 1 | 0 | - | - | 10 | +6
//    (les colonnes BM et BE disparaissent alors du tableau)
//  → La mention rouge « −1 » (match en moins) est désactivée. Pour l'afficher
//    dans une division, ajoutez  showLate: true  dans cette division.
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
//      { from: 1, type: "up",   label: "…" }            vert          (champion / promu)
//      { from: 3, type: "up2",  label: "…" }            vert clair    (barrage de montée)
//      { from: 4, to: 6, type: "info", label: "…" }      bleu clair    (qualification coupe…)
//      { from: 10, type: "mid", label: "…" }            orange        (barrage de maintien)
//      { from: 11, to: 12, type: "down", label: "…" }   rouge foncé   (relégation)
//
//  COULEURS — Ngazidja = bleu, Ndzuani (Anjouan) = rouge, Mwali (Mohéli) = jaune,
//  National = vert Le Nguu. Elles se règlent dans ISLANDS et NATIONAL_THEME ci-dessous.
// =====================================================================

export type Island = "ngazidja" | "ndzuani" | "mwali";
export type ZoneType = "up" | "up2" | "info" | "mid" | "down";

export interface Zone {
  from: number; // première place concernée (1 = leader)
  to?: number; // dernière place concernée (par défaut = from)
  type: ZoneType; // up = vert, up2 = vert clair, info = bleu clair, mid = orange, down = rouge foncé
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
  showLate?: boolean; // true = affiche « −1 » devant les MJ d'un club qui a un match en moins
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
  //  NGAZIDJA
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
      matches: `
        4e journée | Sam. 14 nov. | FC Malé            | 1-1 | US Zilimadjou
        4e journée | Sam. 14 nov. | Atomic Ngomé       | 2-3 | Etoile des Comores
        4e journée | Sam. 14 nov. | Volcan Club        | 0-2 | Djabal FC
        4e journée | Sam. 14 nov. | Fekandza Club      | 2-1 | Angelus Club
        4e journée | Sam. 14 nov. | Amical Club        | 1-1 | FC Hantsindzi
        4e journée | Sam. 14 nov. | FC Chouani         | 0-0 | Elan Club
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 10, type: "mid", label: "Barrage de maintien contre le 3e de la Division 2" },
        { from: 11, to: 12, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "Classement provisoire J4",
      updated: "",
      table: `
        Alizé Fort          | 4 | 3 | 1 | 0 | 9 | 4
        US Mbeni            | 4 | 3 | 1 | 0 | 6 | 2
        Petit Harlem        | 4 | 3 | 0 | 1 | 9 | 4
        Ngaya Club          | 4 | 3 | 0 | 1 | 9 | 5
        FC Mtsamdou         | 4 | 2 | 2 | 0 | 4 | 1
        Twamaya Club        | 4 | 2 | 0 | 2 | 6 | 7
        US Selea            | 4 | 2 | 0 | 2 | 6 | 7
        Enfants des Comores | 4 | 2 | 0 | 2 | 5 | 5
        Avenir Club         | 4 | 2 | 0 | 2 | 5 | 7
        AJSD Club           | 4 | 2 | 0 | 2 | 8 | 3
        Asim Club           | 4 | 2 | 0 | 2 | 5 | 8
        JACM                | 4 | 1 | 2 | 1 | 4 | 5
        FC Mvoumbari        | 4 | 1 | 1 | 2 | 5 | 5
        FC Mlaouni          | 4 | 1 | 0 | 3 | 3 | 6
        Dynamo Club Chamlé  | 4 | 1 | 0 | 3 | 2 | 7
        FC Mdjoiezi         | 4 | 0 | 2 | 2 | 3 | 7
        Kaz Club            | 4 | 0 | 2 | 2 | 4 | 8
        Coin Nord           | 4 | 0 | 1 | 3 | 3 | 8
      `,
      matches: `
        4e journée | Dim. 15 nov. | Kaz Club            | 1-1 | FC Mvoumbari
        4e journée | Dim. 15 nov. | Coin Nord           | 1-2 | Enfants des Comores
        4e journée | Dim. 15 nov. | Petit Harlem        | 2-0 | FC Mdjoiezi
        4e journée | Dim. 15 nov. | JACM                | 4-0 | Twamaya Club
        4e journée | Dim. 15 nov. | Ngaya Club          | 3-0 | Asim Club
        4e journée | Dim. 15 nov. | US Selea            | 5-2 | Avenir Club
        4e journée | Dim. 15 nov. | FC Mlaouni          | 0-2 | FC Mtsamdou
        4e journée | Dim. 15 nov. | Dynamo Club Chamlé  | 0-2 | Alizé Fort
        4e journée | Dim. 15 nov. | US Mbeni            | 1-0 | AJSD Club
      `,
      zones: [
        { from: 1, to: 2, type: "up", label: "Promus en 1re division" },
        { from: 3, type: "up2", label: "Barrage du 3e contre le 10e de la D1" },
        { from: 4, to: 6, type: "info", label: "Du 1er au 6e de la phase aller : qualifiés pour la Coupe de la Ligue" },
        { from: 15, type: "mid", label: "Barrage de maintien contre le 4e du tournoi final du district" },
        { from: 16, to: 18, type: "down", label: "Relégation en D3" },
      ],
    },
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  NDZUANI (Anjouan) — Division 1, classement J4
  //  (buts marqués / encaissés non communiqués : tirets, puis points et différence)
  // ---------------------------------------------------------------
  ndzuani: [
    {
      label: "Division 1",
      phase: "Classement J4",
      updated: "",
      table: `
        Mrango Club     | 4 | 3 | 1 | 0 | - | - | 10 | +6
        Hamumbu Club    | 4 | 3 | 0 | 1 | - | - |  9 | +7
        Gombessa Sport  | 4 | 3 | 0 | 1 | - | - |  9 | +1
        Chirazienne     | 4 | 2 | 2 | 0 | - | - |  8 | +3
        AS Komorozine   | 4 | 1 | 2 | 1 | - | - |  5 | 0
        Ngazi Sport     | 4 | 1 | 1 | 2 | - | - |  4 | -3
        Beressé Club    | 4 | 0 | 3 | 1 | - | - |  3 | -4
        AS Singani      | 4 | 1 | 0 | 3 | - | - |  3 | -4
        Style Nouvel    | 4 | 0 | 2 | 2 | - | - |  2 | -3
        FC Djomakawe    | 4 | 0 | 1 | 3 | - | - |  1 | -3
      `,
      matches: ``,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 8, type: "mid", label: "Barrage de maintien" },
        { from: 9, to: 10, type: "down", label: "Relégation en Division 2" },
      ],
    },
    blank("Division 2"),
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  MWALI (Mohéli) — Division 1, classement J4
  // ---------------------------------------------------------------
  mwali: [
    {
      label: "Division 1",
      phase: "Classement J4",
      updated: "",
      table: `
        Fomboni FC        | 4 | 3 | 1 | 0 | - | - | 10 | +5
        Étoile du Centre  | 3 | 2 | 1 | 0 | - | - |  7 | +3
        Koukoulé FC       | 4 | 2 | 1 | 1 | - | - |  7 | +1
        Ouragan Club      | 4 | 1 | 2 | 1 | - | - |  5 | 0
        Belle Lumière     | 4 | 1 | 1 | 2 | - | - |  4 | -1
        Mbatsé Club       | 4 | 0 | 3 | 1 | - | - |  3 | -2
        Coca Bole         | 4 | 1 | 0 | 3 | - | - |  3 | -3
        Sargonco          | 3 | 0 | 1 | 2 | - | - |  1 | -3
      `,
      matches: ``,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 5, type: "mid", label: "Barrage de maintien" },
        { from: 6, to: 8, type: "down", label: "Relégation en Division 2" },
      ],
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
  // Pour un match décidé aux tirs au but, le dernier champ donne le score des t.a.b. (équipe de gauche d'abord)
  ngazidja: `
    Phase éliminatoire D2 | Ven. 6 nov. | Asim Club           | 0-0 | Coin Nord   | 7-6
    Phase éliminatoire D2 | Ven. 6 nov. | Petit Harlem        | 4-0 | AJSD Club
    Phase éliminatoire D2 | Ven. 6 nov. | US Mbeni            | 1-1 | FC Mtsamdou | 2-4
    Phase éliminatoire D2 | Ven. 6 nov. | Enfants des Comores | 0-1 | US Selea
  `,
  ndzuani: ``,
  mwali: ``,
};

// Phase nationale
export const NATIONAL_CUP = {
  holder: "", // tenant du titre — s'affiche en bandeau si rempli
  matches: ``,
};
