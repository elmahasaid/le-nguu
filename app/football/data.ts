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
//  → Si la différence de buts n'est pas connue non plus, mettez aussi un tiret
//    en dernière colonne : la colonne Diff disparaît à son tour du tableau.
//      Mrango Club | 5 | 3 | 1 | 1 | - | - | 10 | -
//    Et si V, N, D ne sont pas connus non plus : des tirets partout.
//      Étoile d'Or | 4 | - | - | - | - | - | 8 | -
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
      phase: "Classement J6",
      updated: "21 novembre 2026",
      table: `
        Djabal FC          | 6 | 3 | 2 | 1 | 11 | 2
        US Zilimadjou      | 6 | 3 | 1 | 2 | 5  | 4
        Elan Club          | 5 | 3 | 1 | 1 | 5  | 5
        FC Malé            | 6 | 2 | 3 | 1 | 10 | 8
        Volcan Club        | 6 | 3 | 0 | 3 | 4  | 5
        Amical Club        | 5 | 2 | 2 | 1 | 7  | 5
        FC Hantsindzi      | 6 | 2 | 2 | 2 | 8  | 7
        Etoile des Comores | 6 | 2 | 2 | 2 | 10 | 10
        Angelus Club       | 6 | 2 | 2 | 2 | 7  | 7
        FC Chouani         | 6 | 1 | 3 | 2 | 5  | 6
        Atomic Ngomé       | 6 | 1 | 2 | 3 | 6  | 8
        Fekandza Club      | 6 | 1 | 0 | 5 | 3  | 14
      `,
      matches: `
        6e journée | Sam. 21 nov. | US Zilimadjou      | 0-1 | Volcan Club        | @Stade de Moroni
        6e journée | Sam. 21 nov. | Fekandza Club      | 1-2 | Etoile des Comores | @Stade de Madjeouéni
        6e journée | Sam. 21 nov. | Amical Club        | 1-1 | Djabal FC          | @Stade de Chezani
        6e journée | Sam. 21 nov. | FC Chouani         | 1-1 | Angelus Club       | @Stade de Nioumadzaha
        6e journée | Sam. 21 nov. | FC Malé            | 3-3 | FC Hantsindzi      | @Stade de Malé
        6e journée | Sam. 21 nov. | Atomic Ngomé       | 1-2 | Elan Club          | @Stade de Mitsamiouli
        5e journée | Mer. 18 nov. | US Zilimadjou      | 1-0 | Atomic Ngomé       | @Stade de Moroni
        5e journée | Mer. 18 nov. | Etoile des Comores | 0-1 | Volcan Club        | @Stade de Nioumadzaha
        5e journée | Mer. 18 nov. | Djabal FC          | 6-0 | Fekandza Club      | @Stade d'Iconi
        5e journée | Mer. 18 nov. | Angelus Club       | 0-2 | Amical Club        | @Stade de Moindzaza
        5e journée | Mer. 18 nov. | FC Hantsindzi      | 1-0 | FC Chouani         | @Stade de Hantsindzi
        5e journée | Mer. 18 nov. | Elan Club          | 1-4 | FC Malé            | @Stade de Mitsamiouli
        4e journée | Sam. 14 nov. | FC Malé            | 1-1 | US Zilimadjou      | @Stade de Malé
        4e journée | Sam. 14 nov. | Atomic Ngomé       | 2-3 | Etoile des Comores | @Stade de Mitsamiouli
        4e journée | Sam. 14 nov. | Volcan Club        | 0-2 | Djabal FC          | @Stade de Moroni
        4e journée | Sam. 14 nov. | Fekandza Club      | 2-1 | Angelus Club       | @Stade de Madjeouéni
        4e journée | Sam. 14 nov. | Amical Club        | 1-1 | FC Hantsindzi      | @Stade de Chezani
        4e journée | Sam. 14 nov. | FC Chouani         | 0-0 | Elan Club          | @Stade de Nioumadzaha
        3e journée | Sam. 7 nov.  | US Zilimadjou      | 0-2 | FC Chouani
        3e journée | Sam. 7 nov.  | Etoile des Comores | 1-1 | FC Malé
        3e journée | Sam. 7 nov.  | Djabal FC          | 0-0 | Atomic Ngomé
        3e journée | Sam. 7 nov.  | Angelus Club       | 2-1 | Volcan Club
        3e journée | Sam. 7 nov.  | FC Hantsindzi      | 2-0 | Fekandza Club
        3e journée | Sam. 7 nov.  | Elan Club          | -   | Amical Club
        2e journée | Sam. 31 oct. | Amical Club        | 0-1 | US Zilimadjou      | @Stade de Chezani
        2e journée | Sam. 31 oct. | FC Malé            | 1-0 | Djabal FC          | @Stade de Malé
        2e journée | Sam. 31 oct. | Atomic Ngomé       | 1-1 | Angelus Club       | @Stade de Mitsamiouli
        2e journée | Sam. 31 oct. | Volcan Club        | 1-0 | FC Hantsindzi      | @Stade de Moroni
        2e journée | Sam. 31 oct. | Fekandza Club      | 0-1 | Elan Club          | @Stade de Madjeouéni
        2e journée | Dim. 1 nov.  | FC Chouani         | 2-2 | Etoile des Comores | @Stade de Moroni
        1re journée | Dim. 25 oct. | US Zilimadjou      | 2-0 | Fekandza Club      | @Stade de Moroni
        1re journée | Dim. 25 oct. | Etoile des Comores | 2-3 | Amical Club        | @Stade de Nioumadzaha
        1re journée | Dim. 25 oct. | Djabal FC          | 2-0 | FC Chouani         | @Stade d'Iconi
        1re journée | Dim. 25 oct. | Angelus Club       | 2-0 | FC Malé            | @Stade de Moindzaza
        1re journée | Dim. 25 oct. | FC Hantsindzi      | 1-2 | Atomic Ngomé       | @Stade de Hantsindzi
        1re journée | Dim. 25 oct. | Elan Club          | 1-0 | Volcan Club        | @Stade de Mitsamiouli
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 10, type: "mid", label: "Barrage de maintien contre le 3e de la Division 2" },
        { from: 11, to: 12, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "Classement J6",
      updated: "25 novembre 2026",
      table: `
        Ngaya Club          | 6 | 4 | 0 | 2 | 11 | 7
        Alizé Fort          | 6 | 4 | 2 | 0 | 11 | 5
        US Mbeni            | 6 | 4 | 2 | 0 | 11 | 4
        Petit Harlem        | 6 | 4 | 1 | 1 | 12 | 4
        FC Mtsamdou         | 6 | 3 | 3 | 0 | 6  | 2
        JACM                | 6 | 2 | 3 | 1 | 11 | 7
        AJSD Club           | 6 | 2 | 2 | 2 | 11 | 6
        Avenir Club         | 6 | 3 | 1 | 2 | 7  | 8
        Twamaya Club        | 6 | 2 | 1 | 3 | 6  | 10
        US Selea            | 6 | 2 | 1 | 3 | 8  | 12
        Enfants des Comores | 6 | 3 | 0 | 3 | 8  | 8
        FC Mvoumbari        | 6 | 2 | 2 | 2 | 7  | 6
        Asim Club           | 6 | 2 | 0 | 4 | 8  | 13
        FC Mlaouni          | 6 | 1 | 1 | 4 | 4  | 9
        Kaz Club            | 6 | 1 | 3 | 2 | 7  | 10
        Dynamo Club Chamlé  | 6 | 1 | 1 | 4 | 4  | 10
        Coin Nord           | 6 | 0 | 2 | 4 | 4  | 10
        FC Mdjoiezi         | 6 | 0 | 3 | 3 | 3  | 8
      `,
      matches: `
        6e journée | Mer. 25 nov. | Kaz Club            | 0-0 | FC Mdjoiezi         | @Stade de Mitsoudjé
        6e journée | Mer. 25 nov. | Coin Nord           | 0-1 | Avenir Club         | @Stade de Mitsamiouli
        6e journée | Mer. 25 nov. | Petit Harlem        | 3-0 | Twamaya Club        | @Stade de Moroni
        6e journée | Mer. 25 nov. | JACM                | 2-2 | AJSD Club           | @Stade de Nioumadzaha
        6e journée | Mer. 25 nov. | Alizé Fort          | 2-1 | Asim Club           | @Stade de Moindzaza
        6e journée | Mer. 25 nov. | Ngaya Club          | 1-2 | FC Mtsamdou         | @Stade de Madjeouéni
        6e journée | Mer. 25 nov. | FC Mlaouni          | 1-3 | Enfants des Comores | @Stade de Malé
        6e journée | Mer. 25 nov. | Dynamo Club Chamlé  | 1-2 | FC Mvoumbari        | @Stade de Mitsamiouli
        6e journée | Mer. 25 nov. | US Mbeni            | 4-1 | US Selea            | @Stade de Mbeni
        5e journée | Jeu. 19 nov. | Avenir Club         | 1-1 | US Mbeni            | @Stade de Chindini
        5e journée | Jeu. 19 nov. | Twamaya Club        | 0-0 | FC Mlaouni          | @Stade de Mvouni
        5e journée | Jeu. 19 nov. | Enfants des Comores | 0-2 | JACM                | @Stade de Moindzaza
        5e journée | Jeu. 19 nov. | AJSD Club           | 1-1 | Coin Nord           | @Stade de Gnambeni
        5e journée | Jeu. 19 nov. | Asim Club           | 2-3 | Kaz Club            | @Stade de Salimani
        5e journée | Jeu. 19 nov. | FC Mtsamdou         | 0-0 | Petit Harlem        | @Stade de Mtsamdou
        5e journée | Jeu. 19 nov. | FC Mdjoiezi         | 0-1 | Ngaya Club          | @Stade de Nioumadzaha
        5e journée | Jeu. 19 nov. | FC Mvoumbari        | 0-0 | Alizé Fort          | @Stade de Foumbouni
        5e journée | Ven. 20 nov. | US Selea            | 1-1 | Dynamo Club Chamlé  | @Stade de Nioumadzaha
        4e journée | Dim. 15 nov. | Kaz Club            | 1-1 | FC Mvoumbari        | @Stade d'Iconi
        4e journée | Dim. 15 nov. | Coin Nord           | 1-2 | Enfants des Comores | @Stade de Mitsamiouli
        4e journée | Dim. 15 nov. | Petit Harlem        | 2-0 | FC Mdjoiezi         | @Stade d'Ouroveni
        4e journée | Dim. 15 nov. | JACM                | 4-0 | Twamaya Club        | @Stade de Mitsoudjé
        4e journée | Dim. 15 nov. | Ngaya Club          | 3-0 | Asim Club           | @Stade de Moroni
        4e journée | Dim. 15 nov. | US Selea            | 5-2 | Avenir Club         | @Stade de Nioumadzaha
        4e journée | Dim. 15 nov. | FC Mlaouni          | 0-2 | FC Mtsamdou         | @Stade d'Itsinkoudi
        4e journée | Dim. 15 nov. | Dynamo Club Chamlé  | 0-2 | Alizé Fort          | @Stade de Chamlé
        4e journée | Dim. 15 nov. | US Mbeni            | 1-0 | AJSD Club           | @Stade de Mbeni
        3e journée | Dim. 1 nov.  | Avenir Club         | 1-0 | Dynamo Club Chamlé
        3e journée | Dim. 1 nov.  | Twamaya Club        | 4-1 | Coin Nord
        3e journée | Dim. 1 nov.  | Enfants des Comores | 2-3 | US Mbeni
        3e journée | Dim. 1 nov.  | AJSD Club           | 3-0 | US Selea
        3e journée | Dim. 1 nov.  | Asim Club           | 1-4 | Petit Harlem
        3e journée | Dim. 1 nov.  | FC Mtsamdou         | 1-1 | JACM
        3e journée | Dim. 1 nov.  | FC Mdjoiezi         | 1-3 | FC Mlaouni
        3e journée | Dim. 1 nov.  | FC Mvoumbari        | 1-2 | Ngaya Club
        3e journée | Dim. 1 nov.  | Alizé Fort          | 2-2 | Kaz Club
        1re journée | Mer. 21 oct. | Twamaya Club        | 2-0 | US Selea            | @Stade de Mvouni
        1re journée | Mer. 21 oct. | Enfants des Comores | 1-0 | Avenir Club         | @Stade de Chindini
        1re journée | Mer. 21 oct. | Kaz Club            | 1-3 | Ngaya Club          | @Stade de Moindzaza
        1re journée | Mer. 21 oct. | AJSD Club           | 4-0 | Dynamo Club Chamlé  | @Stade de Gnambeni
        1re journée | Mer. 21 oct. | FC Mtsamdou         | 0-0 | US Mbeni            | @Stade de Mtsamdou
        1re journée | Mer. 21 oct. | FC Mvoumbari        | 2-0 | FC Mlaouni          | @Stade de Foumbouni
        1re journée | Mer. 21 oct. | Alizé Fort          | 2-1 | Petit Harlem        | @Stade de Salimani
        1re journée | Sam. 24 oct. | Asim Club           | 3-1 | JACM                | @Stade de Mitsoudjé
        1re journée | Sam. 24 oct. | FC Mdjoiezi         | 1-1 | Coin Nord           | @Stade de Nioumadzaha
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
      phase: "Programme J6",
      updated: "",
      table: `
        Gombessa Sport  | 5 | 4 | 0 | 1 | - | - | 12 | -
        Chirazienne     | 5 | 3 | 2 | 0 | - | - | 11 | -
        Hamumbu Club    | 5 | 3 | 1 | 1 | - | - | 10 | -
        Mrango Club     | 5 | 3 | 1 | 1 | - | - | 10 | -
        AS Komorozine   | 5 | 1 | 3 | 1 | - | - |  6 | -
        AS Singani      | 5 | 2 | 0 | 3 | - | - |  6 | -
        Steal Nouvel    | 5 | 1 | 2 | 2 | - | - |  5 | -
        Ngazi Sport     | 5 | 1 | 1 | 3 | - | - |  4 | -
        Beressé Club    | 5 | 0 | 3 | 2 | - | - |  3 | -
        FC Djomakawe    | 5 | 0 | 1 | 4 | - | - |  1 | -
      `,
      matches: `
        6e journée | Jeu. 26 nov. | Steal Nouvel    | - | Chirazienne    | @Sima Kavani 15h00
        6e journée | Ven. 27 nov. | Beressé Club    | - | Ngazi Sport    | @Sima Kavani 15h00
        6e journée | Sam. 28 nov. | FC Djomakawe    | - | AS Singani     | @Sima Kavani 15h00
        6e journée | Sam. 28 nov. | Chirazienne     | - | Gombessa Sport | @Domoni 15h00
        6e journée | Dim. 29 nov. | FC Djomakawe    | - | Hamumbu Club   | @Sima Kavani 15h00
        5e journée | Ven. 20 nov. | Ngazi Sport     | - | Chirazienne
        5e journée | Sam. 21 nov. | AS Singani      | - | Beressé Club
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 8, type: "mid", label: "Barrage de maintien" },
        { from: 9, to: 10, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "Classement J5",
      updated: "",
      table: `
        Étoile d'Or             | 5 | 3 | 2 | 0 | 9  | 4  | 11
        Ensemble des Amis       | 5 | 2 | 3 | 0 | 9  | 6  | 9
        US Bambao               | 5 | 2 | 3 | 0 | 6  | 3  | 9
        Nouvelle Vague           | 4 | 3 | 0 | 1 | 4  | 2  | 9
        Barakane Sport          | 4 | 2 | 1 | 1 | 8  | 7  | 7
        Chavani Club            | 4 | 1 | 3 | 0 | 1  | 0  | 6
        FC Daoueni              | 4 | 2 | 0 | 2 | 4  | 5  | 6
        UJSM Simba              | 3 | 1 | 1 | 1 | 3  | 3  | 4
        FC Ouani                | 4 | 1 | 1 | 2 | 4  | 5  | 4
        JS Bazimini             | 4 | 0 | 3 | 1 | 4  | 5  | 3
        Ziarra Club             | 5 | 1 | 0 | 4 | 6  | 10 | 3
        AS Daoueni              | 4 | 0 | 2 | 2 | 3  | 5  | 2
        Café Sport              | 5 | 0 | 1 | 4 | 3  | 9  | 1
      `,
      matches: ``,
      zones: [
        { from: 1, to: 2, type: "up", label: "Promus en Division 1" },
        { from: 3, type: "up2", label: "Barrage de montée" },
        { from: 11, type: "mid", label: "Barrage de maintien" },
        { from: 12, to: 13, type: "down", label: "Relégation en Division 3" },
      ],
    },
    blank("Division 3"),
  ],

  // ---------------------------------------------------------------
  //  MWALI (Mohéli)
  // ---------------------------------------------------------------
  mwali: [
    {
      label: "Division 1",
      phase: "Classement J6",
      updated: "28 novembre 2026",
      table: `
        Fomboni FC        | 5 | 4 | 1 | 0 | - | - | 13 | +6
        Étoile du Centre  | 4 | 3 | 1 | 0 | - | - | 10 | +7
        Koukoulé FC       | 5 | 2 | 2 | 1 | - | - |  8 | +1
        Ouragan Club      | 5 | 1 | 2 | 2 | - | - |  5 | -1
        Mbatsé Club       | 5 | 0 | 4 | 1 | - | - |  4 | -2
        Sargonco          | 4 | 1 | 1 | 2 | - | - |  4 | -2
        Belle Lumière     | 5 | 1 | 1 | 3 | - | - |  4 | -5
        Coca Bole         | 5 | 1 | 0 | 4 | - | - |  3 | -4
      `,
      matches: `
        6e journée | Sam. 28 nov. | Belle Lumière     | - | Coca Bole           | @Stade de Djioezi 15h00
        6e journée | Sam. 28 nov. | Fomboni FC        | - | Étoile du Centre    | @Stade de El Hadj Matoir 15h00
        6e journée | Dim. 29 nov. | Koukoulé FC       | - | Sargonco            | @Stade de Ndronroni 15h00
        6e journée | Dim. 29 nov. | Ouragan Club      | - | Mbatsé Club         | @Stade de Boingoma 15h00
        5e journée | Sam. 21 nov. | Koukoulé FC       | 1-1 | Mbatsé Club
        5e journée | Sam. 21 nov. | Coca Bole         | 0-1 | Fomboni FC
        5e journée |              | Étoile du Centre  | 4-0 | Belle Lumière
        5e journée |              | Sargonco          | 1-0 | Ouragan Club
      `,
      zones: [
        { from: 1, type: "up", label: "Champion" },
        { from: 5, type: "mid", label: "Barrage de maintien" },
        { from: 6, to: 8, type: "down", label: "Relégation en Division 2" },
      ],
    },
    {
      label: "Division 2",
      phase: "Classement provisoire",
      updated: "",
      table: `
        Chikabwe USH     | 6 | 4 | 0 | 2 | - | - | 12 | -
        11 Rockets       | 6 | 3 | 1 | 2 | - | - | 10 | -
        FC Itsamia       | 5 | 3 | 0 | 2 | - | - |  9 | -
        Silex Club       | 5 | 2 | 2 | 1 | - | - |  8 | -
        Onze Étoiles     | 5 | 1 | 4 | 0 | - | - |  7 | -
        Kangani Sport    | 5 | 2 | 1 | 2 | - | - |  7 | -
        Arsenal Club     | 5 | 1 | 3 | 1 | - | - |  6 | -
        Wemani Espoir    | 5 | 1 | 3 | 1 | - | - |  6 | -
        Juno Club        | 5 | 1 | 2 | 2 | - | - |  5 | -
        Dynamique CM     | 5 | 0 | 0 | 5 | - | - |  0 | -
      `,
      matches: `
        5e journée | Mer. 18 nov. | Chikabwe USH   | - | 11 Rockets
        5e journée | Mer. 18 nov. | Juno Club      | 0-1 | Silex Club | @Stade de Hoani
        5e journée | Mer. 18 nov. | Dynamique CM   | - | FC Itsamia
        5e journée | Sam. 21 nov. | Kangani Sport  | - | Onze Étoiles
        5e journée | Dim. 22 nov. | Arsenal Club   | - | Wemani Espoir
      `,
      zones: [
        { from: 1, to: 2, type: "up", label: "Promus en Division 1" },
        { from: 3, type: "up2", label: "Barrage de montée" },
        { from: 8, type: "mid", label: "Barrage de maintien" },
        { from: 9, to: 10, type: "down", label: "Relégation en Division 3" },
      ],
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
    16es de finale | Sam. 28 nov. | Etoile des Comores | - | Fekandza Club | @Nioumadzaha 15h00
    16es de finale | Sam. 28 nov. | Angelus Club       | - | Volcan Club   | @Moindzaza 15h00
    16es de finale | Sam. 28 nov. | FC Mdjihari       | - | FC Chouani    | @Mbeni 15h00
    16es de finale | Sam. 28 nov. | Hahaya FC         | - | Amical Club   | @Hahaya 15h00
    16es de finale | Sam. 28 nov. | FC Iconi          | - | Atomic Ngomé  | @Iconi 15h00
    16es de finale | Sam. 28 nov. | Coin Nord         | - | Asim Club     | @Mitsamiouli 15h00
    16es de finale | Sam. 28 nov. | Etoile du Sud     | - | Alizé Fort    | @Foumbouni 15h00
    16es de finale | Dim. 29 nov. | US Selea          | - | Elan Club     | @Nioumadzaha 15h00
    16es de finale | Dim. 29 nov. | FC Mtsamdou       | - | Djabal FC     | @Mtsamdou 15h00
    16es de finale | Dim. 29 nov. | FC Mvoumbari      | - | FC Mlaouni    | @Foumbouni 15h00
    16es de finale | Dim. 29 nov. | FC Garde Score    | - | Enfants des Comores | @Itsinkoudi 15h00
    16es de finale | Dim. 29 nov. | US Ntsaoueni      | - | Avenir Club   | @Mitsamiouli 15h00
    16es de finale | Dim. 29 nov. | Maloudja Club     | - | Twamaya Club  | @Gnambeni 15h00
    16es de finale | Dim. 29 nov. | Petit Harlem      | - | US Zilimadjou | @Ouroveni 15h00
    16es de finale | Dim. 29 nov. | Ngaya Club        | - | FC Hantsindzi | @Moroni 15h00
    16es de finale | Dim. 29 nov. | FC Panga          | - | FC Malé       | @Mitsoudjé 15h00
  `,
  ndzuani: ``,
  mwali: ``,
};

// Phase nationale
export const NATIONAL_CUP = {
  holder: "", // tenant du titre — s'affiche en bandeau si rempli
  matches: ``,
};