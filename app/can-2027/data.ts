export type CanTeam = {
  position: number; name: string; flag: string; played: number;
  won: number; drawn: number; lost: number; goalsFor: number;
  goalsAgainst: number; points: number; difference: number;
};
export type CanGroup = { id: string; name: string; teams: CanTeam[]; matches: string[] };
export const CAN_TITLE = "CAN 2027";
export const CAN_SUBTITLE = "Qualifications";
export const CAN_UPDATED = "20 novembre 2026";
export const CAN_HIGHLIGHT = "Comores";
export const CAN_ZONES = { from: 1, to: 2, label: "Places qualificatives" };

export const CAN_GROUPS: CanGroup[] = [
  { id: "A", name: "Groupe A", teams: [
    { position: 1, name: "Maroc", flag: "🇲🇦", played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 1, points: 12, difference: 9 },
    { position: 2, name: "Gabon", flag: "🇬🇦", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 5, goalsAgainst: 4, points: 6, difference: 1 },
    { position: 3, name: "Niger", flag: "🇳🇪", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 9, points: 3, difference: -6 },
    { position: 4, name: "Lesotho", flag: "🇱🇸", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 7, points: 3, difference: -4 },
  ], matches: [
    "25/09/2026 — Niger 2–1 Lesotho", "25/09/2026 — Maroc 2–0 Gabon",
    "29/09/2026 — Lesotho 0–2 Maroc", "29/09/2026 — Gabon 2–0 Niger",
    "13/11/2026 — Gabon 2–0 Lesotho", "13/11/2026 — Maroc 5–1 Niger",
    "17/11/2026 — Lesotho 2–1 Gabon", "17/11/2026 — Niger 0–1 Maroc",
  ]},
  { id: "B", name: "Groupe B", teams: [
    { position: 1, name: "Angola", flag: "🇦🇴", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 1, points: 10, difference: 5 },
    { position: 2, name: "Égypte", flag: "🇪🇬", played: 4, won: 2, drawn: 2, lost: 0, goalsFor: 10, goalsAgainst: 0, points: 8, difference: 10 },
    { position: 3, name: "Malawi", flag: "🇲🇼", played: 4, won: 1, drawn: 1, lost: 2, goalsFor: 3, goalsAgainst: 9, points: 4, difference: -6 },
    { position: 4, name: "Soudan du Sud", flag: "🇸🇸", played: 4, won: 0, drawn: 0, lost: 4, goalsFor: 1, goalsAgainst: 10, points: 0, difference: -9 },
  ], matches: [
    "25/09/2026 — Malawi 2–1 Soudan du Sud", "25/09/2026 — Égypte 0–0 Angola",
    "29/09/2026 — Soudan du Sud 0–5 Égypte", "06/10/2026 — Angola 3–1 Malawi",
    "13/11/2026 — Égypte 5–0 Malawi", "14/11/2026 — Angola 2–0 Soudan du Sud",
    "17/11/2026 — Malawi 0–0 Égypte", "17/11/2026 — Soudan du Sud 0–1 Angola",
  ]},
  { id: "C", name: "Groupe C", teams: [
    { position: 1, name: "Côte d'Ivoire", flag: "🇨🇮", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 3, points: 10, difference: 5 },
    { position: 2, name: "Gambie", flag: "🇬🇲", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 9, goalsAgainst: 7, points: 7, difference: 2 },
    { position: 3, name: "Ghana", flag: "🇬🇭", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 5, goalsAgainst: 6, points: 6, difference: -1 },
    { position: 4, name: "Somalie", flag: "🇸🇴", played: 4, won: 0, drawn: 0, lost: 4, goalsFor: 1, goalsAgainst: 7, points: 0, difference: -6 },
  ], matches: [
    "24/09/2026 — Côte d'Ivoire 2–0 Ghana", "25/09/2026 — Gambie 2–1 Somalie",
    "29/09/2026 — Ghana 2–4 Gambie", "29/09/2026 — Somalie 0–2 Côte d'Ivoire",
    "12/11/2026 — Ghana 2–0 Somalie", "12/11/2026 — Côte d'Ivoire 2–1 Gambie",
    "16/11/2026 — Somalie 0–1 Ghana", "17/11/2026 — Gambie 2–2 Côte d'Ivoire",
  ]},
  { id: "D", name: "Groupe D", teams: [
    { position: 1, name: "Afrique du Sud", flag: "🇿🇦", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 11, goalsAgainst: 4, points: 10, difference: 7 },
    { position: 2, name: "Guinée", flag: "🇬🇳", played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 7, goalsAgainst: 4, points: 9, difference: 3 },
    { position: 3, name: "Kenya", flag: "🇰🇪", played: 4, won: 0, drawn: 2, lost: 2, goalsFor: 4, goalsAgainst: 6, points: 2, difference: -2 },
    { position: 4, name: "Érythrée", flag: "🇪🇷", played: 4, won: 0, drawn: 1, lost: 3, goalsFor: 3, goalsAgainst: 11, points: 1, difference: -8 },
  ], matches: [
    "26/09/2026 — Kenya 1–1 Érythrée", "26/09/2026 — Afrique du Sud 2–1 Guinée",
    "30/09/2026 — Érythrée 0–5 Afrique du Sud", "01/10/2026 — Guinée 1–0 Kenya",
    "12/11/2026 — Guinée 2–1 Érythrée", "13/11/2026 — Afrique du Sud 2–2 Kenya",
    "16/11/2026 — Érythrée 1–3 Guinée", "17/11/2026 — Kenya 1–2 Afrique du Sud",
  ]},
  { id: "E", name: "Groupe E", teams: [
    { position: 1, name: "RD Congo", flag: "🇨🇩", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 3, points: 10, difference: 5 },
    { position: 2, name: "Zimbabwe", flag: "🇿🇼", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 7, goalsAgainst: 4, points: 7, difference: 3 },
    { position: 3, name: "Guinée équatoriale", flag: "🇬🇶", played: 4, won: 1, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 5, points: 4, difference: -4 },
    { position: 4, name: "Sierra Leone", flag: "🇸🇱", played: 4, won: 0, drawn: 1, lost: 3, goalsFor: 4, goalsAgainst: 8, points: 1, difference: -4 },
  ], matches: [
    "24/09/2026 — RD Congo 2–0 Guinée équatoriale", "24/09/2026 — Sierra Leone 2–3 Zimbabwe",
    "28/09/2026 — Guinée équatoriale 1–0 Sierra Leone", "28/09/2026 — Zimbabwe 1–2 RD Congo",
    "12/11/2026 — RD Congo 3–1 Sierra Leone", "12/11/2026 — Guinée équatoriale 0–0 Zimbabwe",
    "16/11/2026 — Zimbabwe 3–0 Guinée équatoriale", "17/11/2026 — Sierra Leone 1–1 RD Congo",
  ]},
  { id: "F", name: "Groupe F", teams: [
    { position: 1, name: "Bénin", flag: "🇧🇯", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 3, points: 10, difference: 5 },
    { position: 2, name: "Burkina Faso", flag: "🇧🇫", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, points: 10, difference: 4 },
    { position: 3, name: "Mauritanie", flag: "🇲🇷", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 5, goalsAgainst: 7, points: 3, difference: -2 },
    { position: 4, name: "Centrafrique", flag: "🇨🇫", played: 4, won: 0, drawn: 0, lost: 4, goalsFor: 2, goalsAgainst: 9, points: 0, difference: -7 },
  ], matches: [
    "24/09/2026 — Mauritanie 3–1 Centrafrique", "25/09/2026 — Burkina Faso 1–1 Bénin",
    "28/09/2026 — Centrafrique 0–1 Burkina Faso", "29/09/2026 — Bénin 2–1 Mauritanie",
    "12/11/2026 — Bénin 4–1 Centrafrique", "13/11/2026 — Burkina Faso 1–0 Mauritanie",
    "16/11/2026 — Centrafrique 0–1 Bénin", "17/11/2026 — Mauritanie 1–3 Burkina Faso",
  ]},
  { id: "G", name: "Groupe G", teams: [
    { position: 1, name: "Cameroun", flag: "🇨🇲", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 9, goalsAgainst: 2, points: 10, difference: 7 },
    { position: 2, name: "Comores", flag: "🇰🇲", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 7, difference: 0 },
    { position: 3, name: "Namibie", flag: "🇳🇦", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, points: 3, difference: -5 },
    { position: 4, name: "Congo", flag: "🇨🇬", played: 4, won: 0, drawn: 2, lost: 2, goalsFor: 1, goalsAgainst: 3, points: 2, difference: -2 },
  ], matches: [
    "24/09/2026 — Namibie 1–0 Congo", "24/09/2026 — Cameroun 3–1 Comores",
    "29/09/2026 — Comores 1–0 Namibie", "29/09/2026 — Congo 1–1 Cameroun",
    "12/11/2026 — Cameroun 2–0 Namibie", "13/11/2026 — Comores 0–0 Congo",
    "16/11/2026 — Namibie 0–3 Cameroun", "17/11/2026 — Congo 0–1 Comores",
  ]},
  { id: "H", name: "Groupe H", teams: [
    { position: 1, name: "Ouganda", flag: "🇺🇬", played: 4, won: 1, drawn: 3, lost: 0, goalsFor: 4, goalsAgainst: 3, points: 6, difference: 1 },
    { position: 2, name: "Libye", flag: "🇱🇾", played: 4, won: 1, drawn: 2, lost: 1, goalsFor: 5, goalsAgainst: 4, points: 5, difference: 1 },
    { position: 3, name: "Botswana", flag: "🇧🇼", played: 4, won: 0, drawn: 4, lost: 0, goalsFor: 6, goalsAgainst: 6, points: 4, difference: 0 },
    { position: 4, name: "Tunisie", flag: "🇹🇳", played: 4, won: 0, drawn: 3, lost: 1, goalsFor: 4, goalsAgainst: 6, points: 3, difference: -2 },
  ], matches: [
    "24/09/2026 — Libye 2–2 Botswana", "24/09/2026 — Tunisie 1–1 Ouganda",
    "28/09/2026 — Botswana 2–2 Tunisie", "29/09/2026 — Ouganda 1–0 Libye",
    "13/11/2026 — Tunisie 0–2 Libye", "14/11/2026 — Ouganda 1–1 Botswana",
    "17/11/2026 — Libye 1–1 Tunisie", "17/11/2026 — Botswana 1–1 Ouganda",
  ]},
  { id: "I", name: "Groupe I", teams: [
    { position: 1, name: "Algérie", flag: "🇩🇿", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 6, points: 7, difference: 0 },
    { position: 2, name: "Togo", flag: "🇹🇬", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 3, points: 6, difference: 1 },
    { position: 3, name: "Zambie", flag: "🇿🇲", played: 4, won: 1, drawn: 2, lost: 1, goalsFor: 5, goalsAgainst: 5, points: 5, difference: 0 },
    { position: 4, name: "Burundi", flag: "🇧🇮", played: 4, won: 0, drawn: 3, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 3, difference: -1 },
  ], matches: [
    "25/09/2026 — Togo 1–0 Burundi", "25/09/2026 — Algérie 3–1 Zambie",
    "29/09/2026 — Burundi 2–2 Algérie", "29/09/2026 — Zambie 2–0 Togo",
    "13/11/2026 — Zambie 1–1 Burundi", "14/11/2026 — Algérie 1–0 Togo",
    "17/11/2026 — Burundi 1–1 Zambie", "17/11/2026 — Togo 3–0 Algérie",
  ]},
  { id: "J", name: "Groupe J", teams: [
    { position: 1, name: "Sénégal", flag: "🇸🇳", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 10, goalsAgainst: 4, points: 10, difference: 6 },
    { position: 2, name: "Mozambique", flag: "🇲🇿", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 3, points: 7, difference: 3 },
    { position: 3, name: "Soudan", flag: "🇸🇩", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 5, goalsAgainst: 12, points: 3, difference: -7 },
    { position: 4, name: "Éthiopie", flag: "🇪🇹", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 3, points: 3, difference: -2 },
  ], matches: [
    "25/09/2026 — Soudan 1–0 Éthiopie", "25/09/2026 — Mozambique 1–1 Sénégal",
    "29/09/2026 — Mozambique 4–1 Soudan", "29/09/2026 — Éthiopie 0–1 Sénégal",
    "12/11/2026 — Sénégal 4–1 Soudan", "13/11/2026 — Mozambique 0–1 Éthiopie",
    "16/11/2026 — Soudan 2–4 Sénégal", "17/11/2026 — Éthiopie 0–1 Mozambique",
  ]},
  { id: "K", name: "Groupe K", teams: [
    { position: 1, name: "Mali", flag: "🇲🇱", played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 3, points: 12, difference: 6 },
    { position: 2, name: "Rwanda", flag: "🇷🇼", played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 7, goalsAgainst: 7, points: 6, difference: 0 },
    { position: 3, name: "Liberia", flag: "🇱🇷", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 5, goalsAgainst: 8, points: 3, difference: -3 },
    { position: 4, name: "Cap-Vert", flag: "🇨🇻", played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 6, goalsAgainst: 9, points: 3, difference: -3 },
  ], matches: [
    "25/09/2026 — Rwanda 3–1 Liberia", "25/09/2026 — Mali 3–1 Cap-Vert",
    "29/09/2026 — Cap-Vert 1–2 Rwanda", "29/09/2026 — Liberia 0–1 Mali",
    "13/11/2026 — Cap-Vert 4–2 Liberia", "13/11/2026 — Mali 3–2 Rwanda",
    "17/11/2026 — Rwanda 0–2 Mali", "17/11/2026 — Liberia 2–0 Cap-Vert",
  ]},
  { id: "L", name: "Groupe L", teams: [
    { position: 1, name: "Guinée-Bissau", flag: "🇬🇼", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 1, points: 10, difference: 7 },
    { position: 2, name: "Nigeria", flag: "🇳🇬", played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 5, points: 7, difference: 0 },
    { position: 3, name: "Tanzanie", flag: "🇹🇿", played: 4, won: 0, drawn: 2, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 2, difference: -4 },
    { position: 4, name: "Madagascar", flag: "🇲🇬", played: 4, won: 0, drawn: 2, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 2, difference: -3 },
  ], matches: [
    "25/09/2026 — Tanzanie 0–2 Guinée-Bissau", "25/09/2026 — Nigeria 2–1 Madagascar",
    "29/09/2026 — Madagascar 1–1 Tanzanie", "29/09/2026 — Guinée-Bissau 3–0 Nigeria",
    "12/11/2026 — Madagascar 1–1 Guinée-Bissau", "13/11/2026 — Nigeria 3–1 Tanzanie",
    "17/11/2026 — Tanzanie 0–0 Nigeria", "17/11/2026 — Guinée-Bissau 2–0 Madagascar",
  ]},
];
