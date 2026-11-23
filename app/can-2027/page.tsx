// app/can-2027/page.tsx   ←  PAGE CAN 2027 (adresse : /can-2027)
import type { Metadata } from "next";
import CanTabs from "./CanTabs";
import Crumb from "../Crumb";
//import "../football/football.css"; // styles communs (cartes, tableaux, boutons)

export const metadata: Metadata = {
  title: "Éliminatoires CAN 2027 : classements des groupes - Le Nguu",
  description:
    "Classements des 12 groupes des éliminatoires de la CAN 2027 et parcours des Comores (groupe G).",
};

export default function Can2027Page() {
  return (
    <main>
      <div className="wrap">
        <Crumb items={[{ label: "Culture & Sport", href: "/culture-sport" }, { label: "Éliminatoires CAN 2027" }]} fallbackHref="/culture-sport" />

        <div className="fb-band">
          <h1>Éliminatoires CAN 2027</h1>
          <em>Classements des 12 groupes et résultats pour la phase finale</em>
        </div>

        <CanTabs />
      </div>
    </main>
  );
}