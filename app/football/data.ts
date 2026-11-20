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
      phase: "Classement J5",
      updated: "18 novembre 2026",
      table: `
        Djabal FC          | 5 | 3 | 1 | 1 | 10 | 1
        US Zilimadjou      | 5 | 3 | 1 | 1 | 5  | 3
        FC Malé            | 5 | 2 | 2 | 1 | 7  | 5
        Amical Club        | 4 | 2 | 1 | 1 | 6  | 4
        FC Hantsindzi      | 5 | 2 | 1 | 2 | 5  | 4
        Angelus Club       | 5 | 2 | 1 | 2 | 6  | 6
        Elan Club          | 4 | 2 | 1 | 1 | 3  | 4
        Volcan Club        | 5 | 2 | 0 | 3 | 3  | 5
        Etoile des Comores | 5 | 1 | 2 | 2 | 8  | 9
        Atomic Ngomé       | 5 | 1 | 2 | 2 | 5  | 6
        FC Chouani         | 5 | 1 | 2 | 2 | 4  | 5
        Fekandza Club      | 5 | 1 | 0 | 4 | 2  | 12
      `,
      matches: `
        5e journée | Mer. 18 nov. | US Zilimadjou      | 1-0 | Atomic Ngomé
        5e journée | Mer. 18 nov. | Etoile des Comores | 0-1 | Volcan Club
        5e journée | Mer. 18 nov. | Djabal FC          | 6-0 | Fekandza Club
        5e journée | Mer. 18 nov. | Angelus Club       | 0-2 | Amical Club
        5e journée | Mer. 18 nov. | FC Hantsindzi      | 1-0 | FC Chouani
        5e journée | Mer. 18 nov. | Elan Club          | 1-4 | FC Malé
        4e journée | Sam. 14 nov. | FC Malé            | 1-1 | US Zilimadjou
        4e journée | Sam. 14 nov. | Atomic Ngomé       | 2-3 | Etoile des Comores
        4e journée | Sam. 14 nov. | Volcan Club        | 0-2 | Djabal FC
        4e journée | Sam. 14 nov. | Fekandza Club      | 2-1 | Angelus Club
        4e journée | Sam. 14 nov. | Amical Club        | 1-1 | FC Hantsindzi
        4e journée | Sam. 14 nov. | FC Chouani         | 0-0 | Elan Club
        3e journée | Sam. 7 nov.  | US Zilimadjou      | 0-2 | FC Chouani
        3e journée | Sam. 7 nov.  | Etoile des Comores | 1-1 | FC Malé
        3e journée | Sam. 7 nov.  | Djabal FC          | 0-0 | Atomic Ngomé
        3e journée | Sam. 7 nov.  | Angelus Club       | 2-1 | Volcan Club
        3e journée | Sam. 7 nov.  | FC Hantsindzi      | 2-0 | Fekandza Club
        3e journée | Sam. 7 nov.  | Elan Club          | -   | Amical Club
        2e journée | Sam. 31 oct. | Amical Club        | 0-1 | US Zilimadjou
        2e journée | Sam. 31 oct. | FC Malé            | 1-0 | Djabal FC
        2e journée | Sam. 31 oct. | Atomic Ngomé       | 1-1 | Angelus Club
        2e journée | Sam. 31 oct. | Volcan Club        | 1-0 | FC Hantsindzi
        2e journée | Sam. 31 oct. | Fekandza Club      | 0-1 | Elan Club
        2e journée | Dim. 1 nov.  | FC Chouani         | 2-2 | Etoile des Comores
        1re journée | Dim. 25 oct. | US Zilimadjou      | 2-0 | Fekandza Club
        1re journée | Dim. 25 oct. | Etoile des Comores | 2-3 | Amical Club
        1re journée | Dim. 25 oct. | Djabal FC          | 2-0 | FC Chouani
        1re journée | Dim. 25 oct. | Angelus Club       | 2-0 | FC Malé
        1re journée | Dim. 25 oct. | FC Hantsindzi      | 1-2 | Atomic Ngomé
        1re journée | Dim. 25 oct. | Elan Club          | 1-0 | Volcan Club
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
      updated: "15 novembre 2026",
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
        5e journée | Jeu. 19 nov. 15h00 | Avenir Club         | - | US Mbeni            | @Stade de Chindini
        5e journée | Jeu. 19 nov. 15h00 | Twamaya Club        | - | FC Mlaouni          | @Stade de Mvouni
        5e journée | Jeu. 19 nov. 15h00 | Enfants des Comores | - | JACM                | @Stade de Moindzaza
        5e journée | Jeu. 19 nov. 15h00 | AJSD Club           | - | Coin Nord           | @Stade de Gnambeni
        5e journée | Jeu. 19 nov. 15h00 | Asim Club           | - | Kaz Club            | @Stade de Salimani
        5e journée | Jeu. 19 nov. 15h00 | FC Mtsamdou         | - | Petit Harlem        | @Stade de Mtsamdou
        5e journée | Jeu. 19 nov. 15h00 | FC Mdjoiezi         | - | Ngaya Club          | @Stade de Nioumadzaha
        5e journée | Jeu. 19 nov. 15h00 | FC Mvoumbari        | - | Alizé Fort          | @Stade de Foumbouni
        5e journée | Ven. 20 nov. 15h00 | US Selea            | - | Dynamo Club Chamlé  | @Stade de Nioumadzaha
        4e journée | Dim. 15 nov. | Kaz Club            | 1-1 | FC Mvoumbari
        4e journée | Dim. 15 nov. | Coin Nord           | 1-2 | Enfants des Comores
        4e journée | Dim. 15 nov. | Petit Harlem        | 2-0 | FC Mdjoiezi
        4e journée | Dim. 15 nov. | JACM                | 4-0 | Twamaya Club
        4e journée | Dim. 15 nov. | Ngaya Club          | 3-0 | Asim Club
        4e journée | Dim. 15 nov. | US Selea            | 5-2 | Avenir Club
        4e journée | Dim. 15 nov. | FC Mlaouni          | 0-2 | FC Mtsamdou
        4e journée | Dim. 15 nov. | Dynamo Club Chamlé  | 0-2 | Alizé Fort
        4e journée | Dim. 15 nov. | US Mbeni            | 1-0 | AJSD Club
        3e journée | Dim. 1 nov.  | Avenir Club         | -   | Dynamo Club
        3e journée | Dim. 1 nov.  | Twamaya Club        | -   | Coin Nord
        3e journée | Dim. 1 nov.  | Enfants des Comores | -   | US Mbeni
        3e journée | Dim. 1 nov.  | AJSD Club           | -   | US Selea
        3e journée | Dim. 1 nov.  | Asim Club           | -   | Petit Harlem
        3e journée | Dim. 1 nov.  | FC Mtsamdou         | -   | JACM
        3e journée | Dim. 1 nov.  | FC Mdjoiezi         | -   | FC Mlaouni
        3e journée | Dim. 1 nov.  | FC Mvoumbari        | -   | Ngaya Club
        3e journée | Dim. 1 nov.  | Alizé Fort          | -   | Kaz Club
        1re journée | Mer. 21 oct. | Twamaya Club        | 2-0 | US Selea
        1re journée | Mer. 21 oct. | Enfants des Comores | 1-0 | Avenir Club
        1re journée | Mer. 21 oct. | Kaz Club            | 1-3 | Ngaya Club
        1re journée | Mer. 21 oct. | AJSD Club           | 4-0 | Dynamo Club
        1re journée | Mer. 21 oct. | FC Mtsamdou         | 0-0 | US Mbeni
        1re journée | Mer. 21 oct. | FC Mvoumbari        | 2-0 | FC Mlaouni
        1re journée | Mer. 21 oct. | Alizé Fort          | 2-1 | Petit Harlem
        1re journée | Sam. 24 oct. | Asim Club           | 3-1 | JACM
        1re journée | Sam. 24 oct. | FC Mdjoiezi         | 1-1 | Coin Nord
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
  //  NDZUANI (Anjouan)
  //  D1 : buts marqués / encaissés non communiqués (tirets, puis points et différence)
  //  D2 : victoires / nuls / défaites non communiqués non plus
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
        AS Singani      | 4 | 1 | 0 | 3 | - | - |  3 | -4
        Beressé Club    | 4 | 0 | 3 | 1 | - | - |  3 | -4
        Steal Nouvel    | 4 | 0 | 2 | 2 | - | - |  2 | -3
        FC Djomakawe    | 4 | 0 | 1 | 3 | - | - |  1 | -3
      `,
      matches: `
        5e journée | Ven. 20 nov. 15h00 | Ngazi Sport | - | Chirazienne
        5e journée | Sam. 21 nov. 15h00 | AS Singani  | - | Beressé Club
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 8, type: "mid", label: "Barrage de maintien" },
        { from: 9, to: 10, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "Classement",
      updated: "",
      table: `
        Étoile d'Or          | 3 | 0 | 0 | 0 | 0 | 0 | 7 | +4
        Nouvel Vagues        | 2 | 0 | 0 | 0 | 0 | 0 | 6 | +2
        Chavani Club         | 2 | 0 | 0 | 0 | 0 | 0 | 4 | +1
        US Bambao            | 3 | 0 | 0 | 0 | 0 | 0 | 4 | +1
        UJSM Simba           | 3 | 0 | 0 | 0 | 0 | 0 | 4 | +1
        Ziarra Club          | 3 | 0 | 0 | 0 | 0 | 0 | 4 | +1
        FC Ouani             | 3 | 0 | 0 | 0 | 0 | 0 | 3 | 0
        Ensemble des Amis    | 3 | 0 | 0 | 0 | 0 | 0 | 3 | 0
        Barakane Sport       | 2 | 0 | 0 | 0 | 0 | 0 | 3 | 0
        AS Daoueni           | 1 | 0 | 0 | 0 | 0 | 0 | 2 | -1
        Café Sport           | 3 | 0 | 0 | 0 | 0 | 0 | 1 | -2
        JS Bazimini          | 3 | 0 | 0 | 0 | 0 | 0 | 0 | -1
        FC Daoueni           | 2 | 0 | 0 | 0 | 0 | 0 | 0 | -3
      `,
      matches: ``,
      zones: [],
    },
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  MWALI (Mohéli)
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
      matches: `
        5e journée | Sam. 21 nov. 15h00 | Mbatsé Club | - | Koukoulé FC
        5e journée | Sam. 21 nov. 15h00 | US Wanani   | - | Fomboni FC
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 5, type: "mid", label: "Barrage de maintien" },
        { from: 6, to: 8, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "5e journée",
      updated: "18 novembre 2026",
      table: ``,
      matches: `
        5e journée | Mer. 18 nov. | Chikabwe USH   | - | 11 Rockets
        5e journée | Mer. 18 nov. | Juno Club      | 0-1 | Silex Club
        5e journée | Mer. 18 nov. | Dynamique CM   | - | FC Itsamia
        5e journée | Sam. 21 nov. | Kangani Sport  | - | Onze Étoiles
        5e journée | Dim. 22 nov. | Arsenal Club   | - | Wemani Espoir
      `,
      zones: [],
    },
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
    Phase éliminatoire D2 | Dim. 8 nov. | Dynamo Club Chamlé  | 1-3 | FC Mvoumbari
    Phase éliminatoire D2 | Dim. 8 nov. | Twamaya Club        | 1-1 | Avenir Club | 10-11
    Phase éliminatoire D2 | Dim. 8 nov. | Kaz Club            | 1-1 | Ngaya Club  | 3-4
    Phase éliminatoire D2 | Dim. 8 nov. | Alizé Fort          | 3-2 | JACM
    Phase éliminatoire D2 | Dim. 8 nov. | FC Mlaouni          | 1-1 | FC Mdjoiezi | 4-3
  `,
  ndzuani: ``,
  mwali: ``,
};

// Phase nationale
export const NATIONAL_CUP = {
  holder: "", // tenant du titre — s'affiche en bandeau si rempli
  matches: ``,
};