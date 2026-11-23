// app/basket/data.ts
// =====================================================================
//  C'EST LE SEUL FICHIER À MODIFIER POUR METTRE À JOUR LA PAGE BASKET
// =====================================================================
//
//  CLASSEMENT — une ligne par équipe, colonnes séparées par  |
//  (même ordre que le tableau Excel de la ligue : vous pouvez le copier-coller)
//      Équipe | MJ | V | D | F | Pts | PM | PE | Moy
//      Djabal Basket | 13 | 12 | 1 | 0 | 25 | 953 | 706 | 247
//  → MJ matchs joués · V victoires · D défaites (forfaits compris) · F forfaits
//    Pts points · PM points marqués · PE points encaissés · Moy points average
//  → Pts et Moy sont facultatifs : s'ils sont vides, ils sont calculés
//    (2 points par victoire, 1 par défaite, 0 par forfait ; Moy = PM - PE).
//  → Si PM / PE sont inconnus, mettez un tiret et donnez la moyenne :
//      Lunos | 13 | 4 | 9 | 1 | 16 | - | - | -73
//  → L'ordre est celui que vous tapez (celui de la ligue). autoSort: true le calcule.
//
//  RÉSULTATS — une ligne par match
//      Tour | Date | Équipe domicile | Score | Équipe extérieur
//      6e journée | Sam. 14 nov. | BCM | 45-54 | Atomic Basket
//      7e journée | Sam. 21 nov. | Lunos | - | Djabal Basket        ← pas encore joué
//  Les lignes qui ont le même « Tour » sont regroupées. Une ligne qui
//  commence par # est ignorée.
//
//  LOGOS — dans public/clubs/ : nom du club en minuscules, sans accent, avec des tirets
//      Djabal Basket  →  public/clubs/djabal-basket.png
//
//  COULEURS DES LIGNES (zones) — types : up (vert), up2 (vert clair), info (bleu clair),
//  mid (orange), down (rouge foncé). Renseignez label pour afficher une légende ;
//  un label vide n'affiche pas de légende (la couleur seule reste).
//      { from: 1, to: 2, type: "up", label: "Qualifiés pour …" }
// =====================================================================

import type { Island, Zone } from "../football/data";

// Année affichée dans le titre des cartes (ex. « Championnat régional de Ngazidja · 2026 »)
export const BASKET_SEASON = "2026";

export interface BasketCategory {
  label: string; // texte du bouton : "Excellence"
  title: string; // titre de la carte de classement
  phase?: string; // pastille : "Classement provisoire"
  updated?: string; // "17 novembre 2026"
  table: string;
  matches: string;
  zones: Zone[];
  autoSort?: boolean;
}

const blank = (label: string): BasketCategory => ({
  label,
  title: `Classement · Catégorie ${label}`,
  table: ``,
  matches: ``,
  zones: [],
});

// Les trois catégories des championnats régionaux (à adapter si besoin)
const emptyIsland = (): BasketCategory[] => [blank("Excellence"), blank("Honneur"), blank("Dames")];

// =====================================================================
//  CHAMPIONNATS RÉGIONAUX
// =====================================================================
export const BASKET_LEAGUES: Record<Island, BasketCategory[]> = {
  // ---------------------------------------------------------------
  //  NGAZIDJA — résultats de la phase retour (14 et 15 novembre 2026)
  // ---------------------------------------------------------------
  ngazidja: [
    {
      label: "Excellence",
      title: "Classement · Catégorie Excellence",
      phase: "Classement provisoire",
      updated: "",
      table: `
        Djabal Basket          | 14 | 13 |  1 | 0 | 27 | 1023 | 765 |  258
        Atomic Basket          | 14 | 10 |  4 | 0 | 24 |  739 | 660 |   79
        Espoir des Comores     | 13 |  6 |  7 | 0 | 19 |  968 | 941 |   27
        Papillon Bleu          | 13 |  7 |  6 | 1 | 19 |  850 | 839 |   11
        BCM                    | 13 |  5 |  8 | 0 | 18 |  751 | 824 |  -73
        ASD Dimadjou Itsandra  | 13 |  4 |  9 | 0 | 17 |  790 | 893 | -103
        Lunos                  | 13 |  4 |  9 | 1 | 16 |  666 | 739 |  -73
        Enfants des Comores    | 13 |  4 |  9 | 1 | 16 |  688 | 814 | -126
      `,
      matches: `
        6e journée · phase retour | Sam. 14 nov. | ASD Dimadjou Itsandra | 74-76 | Papillon Bleu
        6e journée · phase retour | Sam. 14 nov. | BCM                   | 45-54 | Atomic Basket
        6e journée · phase retour | Dim. 15 nov. | Enfants des Comores   | 63-70 | Djabal Basket
      `,
      // La couleur des lignes reprend le tableau de la ligue. Ajoutez le texte de la légende
      // (ex. « Qualifiés pour … », « Relégation ») dans les « label » ci-dessous.
      zones: [
        { from: 1, to: 2, type: "up", label: "" },
        { from: 3, type: "up2", label: "" },
        { from: 6, type: "mid", label: "" },
        { from: 7, to: 8, type: "down", label: "" },
      ],
    },
    {
      label: "Honneur",
      title: "Classement · Catégorie Honneur",
      table: ``,
      matches: `
        Matchs en retard | Sam. 14 nov. | Djabal City | 56-44 | Djamabibo Ouzioini
        Matchs en retard | Dim. 15 nov. | Amisco      | 69-58 | Fesmay Batsa Itsandra
      `,
      zones: [],
    },
    {
      label: "Dames",
      title: "Classement · Catégorie Dames",
      table: `
        Djabal Basket        | 7 | 5 | 2 | 0 | 12 | 500 | 232 |  268
        Amisco               | 8 | 4 | 4 | 0 | 12 | 471 | 339 |  132
        Espoir des Comores   | 6 | 5 | 1 | 0 | 11 | 353 | 215 |  138
        Enfants des Comores  | 7 | 3 | 4 | 0 | 10 | 392 | 395 |   -3
        Étoile du Sud        | 8 | 1 | 7 | 0 |  9 | 213 | 748 | -535
      `,
      matches: `
        3e journée | Sam. 14 nov. | Étoile du Sud | 62-57 | Enfants des Comores
        3e journée | Sam. 14 nov. | Amisco        | 40-68 | Djabal Basket
      `,
      zones: [],
    },
  ],

  ndzuani: emptyIsland(),
  mwali: emptyIsland(),
};

// =====================================================================
//  CHAMPIONNAT NATIONAL
// =====================================================================
export const BASKET_NATIONAL: BasketCategory = {
  label: "Classement général",
  title: "Classement général",
  updated: "",
  table: ``,
  matches: ``,
  zones: [{ from: 1, type: "up", label: "Champion des Comores" }],
};