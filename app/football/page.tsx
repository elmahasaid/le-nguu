// app/football/page.tsx
import type { Metadata } from "next";
import FootballTabs from "./FootballTabs";
import "./football.css";

export const metadata: Metadata = {
  title: "Football comorien : championnats et coupes - Le Nguu",
  description:
    "Classements, résultats et calendriers des championnats de Ngazidja, Ndzuani et Mwali, du championnat national et des Coupes des Comores.",
};

export default function FootballPage() {
  return (
    <main>
      <div className="wrap">
        <div className="fb-band">
          <h1>Football comorien</h1>
          <em>Championnats des trois îles, phase nationale et Coupes des Comores</em>
        </div>

        <FootballTabs />
      </div>
    </main>
  );
}
