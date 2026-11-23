// app/basket/page.tsx   ←  PAGE BASKET (adresse : /basket)
import type { Metadata } from "next";
import BasketTabs from "./BasketTabs";
import Crumb from "../Crumb";
import "../football/football.css"; // styles communs (cartes, tableaux, boutons)
import "./basket.css"; // styles propres au basket

export const metadata: Metadata = {
  title: "Basket-ball comorien : classements et résultats - Le Nguu",
  description:
    "Classements et résultats des championnats de basket-ball de Ngazidja, Ndzuani, Mwali et du championnat national.",
};

export default function BasketPage() {
  return (
    <main>
      <div className="wrap">
        <Crumb items={[{ label: "Culture & Sport", href: "/culture-sport" }, { label: "Basket-ball" }]} fallbackHref="/culture-sport" />

        <div className="fb-band bk-band">
          <h1>Basket-ball comorien</h1>
          <em>Championnats régionaux et national : classements et résultats</em>
        </div>

        <BasketTabs />
      </div>
    </main>
  );
}
