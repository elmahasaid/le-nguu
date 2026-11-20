
"use client";

import { useState } from "react";
import {
  CAN_GROUPS,
  CAN_HIGHLIGHT,
  CAN_TITLE,
  CAN_SUBTITLE,
  CAN_UPDATED,
  CAN_ZONES,
  type CanGroup,
} from "./data";

function formatDiff(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

// Codes ISO 3166-1 alpha-2 utilisés par FlagCDN pour afficher les drapeaux.
const COUNTRY_CODES: Record<string, string> = {
  "Maroc": "ma", "Gabon": "ga", "Niger": "ne", "Lesotho": "ls",
  "Égypte": "eg", "Angola": "ao", "Malawi": "mw", "Soudan du Sud": "ss",
  "Côte d'Ivoire": "ci", "Gambie": "gm", "Ghana": "gh", "Somalie": "so",
  "Afrique du Sud": "za", "Guinée": "gn", "Kenya": "ke", "Érythrée": "er",
  "RD Congo": "cd", "Zimbabwe": "zw", "Guinée équatoriale": "gq", "Sierra Leone": "sl",
  "Bénin": "bj", "Burkina Faso": "bf", "Mauritanie": "mr", "Centrafrique": "cf",
  "Cameroun": "cm", "Comores": "km", "Namibie": "na", "Congo": "cg",
  "Ouganda": "ug", "Libye": "ly", "Botswana": "bw", "Tunisie": "tn",
  "Algérie": "dz", "Zambie": "zm", "Togo": "tg", "Burundi": "bi",
  "Sénégal": "sn", "Mozambique": "mz", "Soudan": "sd", "Éthiopie": "et",
  "Mali": "ml", "Rwanda": "rw", "Cap-Vert": "cv", "Liberia": "lr",
  "Guinée-Bissau": "gw", "Nigeria": "ng", "Madagascar": "mg", "Tanzanie": "tz",
};

function getFlagUrl(country: string) {
  const code = COUNTRY_CODES[country];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

function GroupTable({ group }: { group: CanGroup }) {
  return (
    <div className="can-table-scroll">
      <table className="can-table">
        <thead>
          <tr>
            <th className="rank-col">#</th>
            <th className="team-col">Équipe</th>
            <th>MJ</th>
            <th>V</th>
            <th>N</th>
            <th>D</th>
            <th>BM</th>
            <th>BE</th>
            <th>Pts</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((team) => {
            const qualified =
              team.position >= CAN_ZONES.from &&
              team.position <= CAN_ZONES.to;

            return (
              <tr
                key={team.name}
                className={
                  team.name === CAN_HIGHLIGHT ? "can-highlight-row" : ""
                }
              >
                <td>
                  <span className={`can-rank ${qualified ? "qualified" : ""}`}>
                    {team.position}
                  </span>
                </td>
                <td className="team-col">
                  <span className="can-team">
                    {getFlagUrl(team.name) ? (
                      <img
                        className="can-flag"
                        src={getFlagUrl(team.name)!}
                        alt={`Drapeau ${team.name}`}
                        width={24}
                        height={16}
                        loading="lazy"
                      />
                    ) : (
                      <span className="can-flag-fallback" aria-hidden="true">
                        {team.flag}
                      </span>
                    )}
                    <span>{team.name}</span>
                    {team.name === CAN_HIGHLIGHT && (
                      <span className="can-com-badge">COM</span>
                    )}
                  </span>
                </td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td className="can-points">{team.points}</td>
                <td className="can-diff">{formatDiff(team.difference)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GroupAccordion({ group }: { group: CanGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <section className={`can-accordion ${open ? "open" : ""}`}>
      <button
        type="button"
        className="can-accordion-head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="can-caf-mini">🏆</span>
        <span className="can-accordion-title">{group.name}</span>
        <span className="can-accordion-count">4 équipes</span>
        <span className={`can-arrow ${open ? "up" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="can-accordion-body">
          <GroupTable group={group} />
        </div>
      )}
    </section>
  );
}

export default function CanTabs() {
  const [selected, setSelected] = useState("all");

  const currentGroup =
    CAN_GROUPS.find((group) => group.id === selected) ?? CAN_GROUPS[0];

  return (
    <main className="can-page">
      <section className="can-hero">
        <div className="can-brand">
          <strong>LE NGUU</strong>
          <span>L'info des Comores</span>
        </div>

        <div className="can-hero-inner">
          <div className="can-caf-emblem">
            <span>🌍</span>
            <strong>CAF</strong>
          </div>

          <div className="can-hero-title">
            <span className="can-eyebrow">FOOTBALL AFRICAIN</span>
            <h1>{CAN_TITLE}</h1>
            <div className="can-subtitle">— {CAN_SUBTITLE} —</div>
            <div className="can-hero-details">
              <span>▦ {CAN_UPDATED}</span>
              <span className="can-separator">|</span>
              <span>⭐ Comores 🇰🇲</span>
            </div>
          </div>

          <div className="can-trophy" aria-hidden="true">
            🏆
          </div>

          <div className="can-slogan">
            Ensemble
            <br />
            pour la CAN !
          </div>
        </div>
      </section>

      <div className="can-container">
        <nav className="can-tabs" aria-label="Groupes de qualification">
          <button
            type="button"
            className={selected === "all" ? "active" : ""}
            onClick={() => setSelected("all")}
          >
            <span>▦</span> Tous les groupes
          </button>

          {CAN_GROUPS.map((group) => (
            <button
              type="button"
              key={group.id}
              className={selected === group.id ? "active" : ""}
              onClick={() => setSelected(group.id)}
            >
              {group.name}
            </button>
          ))}
        </nav>

        <div className="can-grid">
          <div className="can-main">
            {selected === "all" ? (
              <>
                <section className="can-featured">
                  <div className="can-section-head">
                    <span className="can-cup">🏆</span>
                    <h2>Groupe A</h2>
                    <span className="can-round">
                      Classement après la 4e journée
                    </span>
                  </div>
                  <GroupTable group={CAN_GROUPS[0]} />
                </section>

                <div className="can-accordions">
                  {CAN_GROUPS.slice(1).map((group) => (
                    <GroupAccordion key={group.id} group={group} />
                  ))}
                </div>
              </>
            ) : (
              <section className="can-featured">
                <div className="can-section-head">
                  <span className="can-cup">🏆</span>
                  <h2>{currentGroup.name}</h2>
                  <span className="can-round">
                    Classement après la 4e journée
                  </span>
                </div>
                <GroupTable group={currentGroup} />
              </section>
            )}
          </div>

          <aside className="can-side">
            <section className="can-results">
              <div className="can-side-head">
                <span>⚽</span>
                <h2>Résultats – {currentGroup.name}</h2>
              </div>

              {currentGroup.matches.length > 0 ? (
                <div className="can-results-list">
                  {currentGroup.matches.map((match, index) => (
                    <div className="can-result" key={index}>
                      {match}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="can-empty-results">
                  <span className="can-calendar">▦</span>
                  <strong>Résultats non renseignés</strong>
                  <p>
                    Les rencontres de ce groupe seront affichées ici dès que
                    leurs résultats seront disponibles.
                  </p>
                </div>
              )}
            </section>

            <section className="can-info-card">
              <span className="can-info-trophy">🏆</span>
              <div>
                <h3>À propos des éliminatoires</h3>
                <p>
                  Les deux premières places de chaque groupe sont indiquées
                  comme qualificatives pour la CAN 2027.
                </p>
              </div>
              <div className="can-info-stripe" />
            </section>

            <section className="can-legend">
              <h3>Classement</h3>
              <p>
                <span className="can-rank qualified">1</span>
                Places qualificatives
              </p>
              <p>
                <span className="can-rank">3</span>
                Autres positions
              </p>
            </section>
          </aside>
        </div>

        <footer className="can-footer">
          <strong>LE NGUU</strong>
          <span>CAN 2027 · Qualifications</span>
        </footer>
      </div>

      <style jsx global>{`
        .can-page {
          --can-green: #075334;
          --can-dark: #063d2d;
          --can-bright: #087b40;
          --can-gold: #f4ce27;
          color: #151a17;
          background: #faf9f5;
          min-height: 600px;
          font-family: Arial, Helvetica, sans-serif;
          padding-bottom: 30px;
        }

        .can-page * {
          box-sizing: border-box;
        }

        .can-hero {
          position: relative;
          overflow: hidden;
          color: white;
          background:
            radial-gradient(ellipse at 80% 30%, #268353 0%, transparent 35%),
            linear-gradient(110deg, #03452e, #07603b 55%, #073a2b);
        }

        .can-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.12;
          pointer-events: none;
          background: repeating-linear-gradient(
            135deg,
            transparent 0 25px,
            #ffffff 26px,
            transparent 28px
          );
        }

        .can-brand {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 12px 35px 12px 4%;
          color: var(--can-green);
          background: #fbfaf5;
          border-radius: 0 0 25px 0;
        }

        .can-brand strong {
          font-size: 27px;
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .can-brand span {
          font-size: 12px;
          font-style: italic;
          text-align: center;
        }

        .can-hero-inner {
          position: relative;
          z-index: 1;
          min-height: 280px;
          padding: 55px 5% 25px;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .can-caf-emblem {
          flex: 0 0 125px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .can-caf-emblem > span {
          display: grid;
          place-items: center;
          width: 105px;
          height: 105px;
          border: 5px solid #e8b936;
          border-radius: 50%;
          background: #e8c24a;
          font-size: 62px;
        }

        .can-caf-emblem strong {
          font-size: 29px;
          letter-spacing: 5px;
        }

        .can-hero-title {
          min-width: 0;
        }

        .can-eyebrow {
          color: #d5e8dc;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .can-hero-title h1 {
          margin: 5px 0 0;
          font-size: clamp(43px, 6vw, 82px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .can-subtitle {
          margin-top: 5px;
          color: var(--can-gold);
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 900;
        }

        .can-hero-details {
          display: flex;
          flex-wrap: wrap;
          gap: 17px;
          align-items: center;
          margin-top: 20px;
          font-size: 17px;
          font-weight: 700;
        }

        .can-separator {
          color: #b5d2c2;
        }

        .can-trophy {
          margin-left: auto;
          font-size: clamp(80px, 10vw, 145px);
          filter: drop-shadow(0 10px 12px #001b13a0);
        }

        .can-slogan {
          color: #fff2bf;
          font-size: clamp(18px, 2vw, 27px);
          font-weight: 900;
          font-style: italic;
          text-align: center;
          line-height: 1.2;
          transform: rotate(-7deg);
        }

        .can-container {
          width: min(1500px, 100%);
          margin: 0 auto;
          padding: 18px 24px;
        }

        .can-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 17px;
        }

        .can-tabs button {
          min-height: 47px;
          padding: 10px 20px;
          border: 1px solid #e2e2dc;
          border-radius: 12px;
          color: #123e2d;
          background: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 1px 3px #00000008;
          transition: background 0.18s, color 0.18s;
        }

        .can-tabs button:hover {
          border-color: #16824a;
          background: #eef6ef;
        }

        .can-tabs button.active {
          color: white;
          border-color: #087b40;
          background: #087b40;
          box-shadow: 0 3px 8px #07533425;
        }

        .can-tabs button:first-child span {
          margin-right: 7px;
        }

        .can-grid {
          display: grid;
          grid-template-columns: minmax(0, 2.1fr) minmax(270px, 0.9fr);
          gap: 17px;
          align-items: start;
        }

        .can-main,
        .can-side {
          min-width: 0;
        }

        .can-featured,
        .can-results,
        .can-info-card,
        .can-legend {
          overflow: hidden;
          border: 1px solid #e5e4dd;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 2px 6px #172a1c0d;
        }

        .can-section-head {
          min-height: 65px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: white;
          background: linear-gradient(100deg, #07502f, #00643a);
        }

        .can-cup {
          font-size: 30px;
        }

        .can-section-head h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 900;
        }

        .can-round {
          margin-left: auto;
          padding: 11px 18px;
          border-radius: 30px;
          background: #ffffff20;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .can-table-scroll {
          width: 100%;
          overflow-x: auto;
        }

        .can-table {
          width: 100%;
          min-width: 620px;
          border-collapse: collapse;
          text-align: center;
          font-size: 15px;
        }

        .can-table thead {
          color: #17231b;
          background: #dcebdc;
        }

        .can-table th {
          padding: 12px 7px;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
        }

        .can-table td {
          height: 48px;
          padding: 7px;
          border-bottom: 1px solid #eaece7;
          white-space: nowrap;
        }

        .can-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .can-table tbody tr:hover {
          background: #f3f8f2;
        }

        .can-table .rank-col {
          width: 55px;
        }

        .can-table .team-col {
          width: 32%;
          text-align: left;
        }

        .can-team {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
        }

        .can-flag {
          display: inline-block;
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
          flex: 0 0 24px;
          box-shadow: 0 0 0 1px #00000012;
        }

        .can-flag-fallback {
          display: inline-block;
          font-size: 23px;
          line-height: 1;
        }

        .can-rank {
          display: inline-grid;
          place-items: center;
          width: 29px;
          height: 29px;
          border-radius: 50%;
          background: #e4e5e2;
          color: #292d29;
          font-size: 14px;
          font-weight: 800;
        }

        .can-rank.qualified {
          color: white;
          background: #168547;
        }

        .can-points,
        .can-diff {
          font-weight: 900;
        }

        .can-highlight-row {
          background: #eff8ef;
        }

        .can-com-badge {
          padding: 3px 6px;
          border-radius: 12px;
          color: #075334;
          background: #d8eddf;
          font-size: 9px;
          font-weight: 900;
        }

        .can-accordions {
          display: grid;
          gap: 8px;
          margin-top: 15px;
        }

        .can-accordion {
          overflow: hidden;
          border: 1px solid #dbe5dc;
          border-radius: 12px;
          background: white;
        }

        .can-accordion-head {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 49px;
          padding: 8px 17px;
          border: 0;
          color: white;
          background: linear-gradient(100deg, #064a32, #07533a);
          text-align: left;
          cursor: pointer;
        }

        .can-accordion-head:hover {
          background: #087044;
        }

        .can-caf-mini {
          font-size: 23px;
        }

        .can-accordion-title {
          font-size: 19px;
          font-weight: 900;
        }

        .can-accordion-count {
          margin-left: auto;
          color: #d1e5d7;
          font-size: 12px;
        }

        .can-arrow {
          margin-left: 12px;
          font-size: 25px;
          transition: transform 0.2s;
        }

        .can-arrow.up {
          transform: rotate(180deg);
        }

        .can-accordion-body {
          background: white;
        }

        .can-side {
          display: grid;
          gap: 16px;
        }

        .can-side-head {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 65px;
          padding: 12px 18px;
          color: white;
          background: #064532;
        }

        .can-side-head > span {
          font-size: 29px;
        }

        .can-side-head h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 900;
        }

        .can-empty-results {
          min-height: 205px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 22px;
          text-align: center;
        }

        .can-calendar {
          margin-bottom: 10px;
          color: #078044;
          font-size: 32px;
        }

        .can-empty-results strong {
          color: #075334;
          font-size: 17px;
        }

        .can-empty-results p {
          max-width: 300px;
          margin: 9px 0 0;
          color: #536057;
          font-size: 14px;
          line-height: 1.55;
        }

        .can-results-list {
          padding: 8px 18px;
        }

        .can-result {
          padding: 14px 0;
          border-bottom: 1px solid #ecece7;
          font-size: 14px;
        }

        .can-result:last-child {
          border-bottom: 0;
        }

        .can-info-card {
          position: relative;
          display: flex;
          gap: 15px;
          padding: 23px 18px;
          background: linear-gradient(120deg, #fff7df, #fffdf4);
        }

        .can-info-trophy {
          flex: 0 0 auto;
          font-size: 40px;
        }

        .can-info-card h3 {
          margin: 2px 0 9px;
          color: #075334;
          font-size: 19px;
          font-weight: 900;
        }

        .can-info-card p {
          margin: 0;
          color: #252b26;
          font-size: 14px;
          line-height: 1.6;
        }

        .can-info-stripe {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 90px;
          height: 7px;
          background: linear-gradient(90deg, #087a3d, #f0c51d);
          transform: skewY(-12deg);
        }

        .can-legend {
          padding: 18px;
        }

        .can-legend h3 {
          margin: 0 0 12px;
          color: #075334;
          font-size: 17px;
        }

        .can-legend p {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0 0;
          font-size: 13px;
        }

        .can-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          padding: 15px 2px 0;
          border-top: 1px solid #e4e5dc;
          color: #758077;
          font-size: 12px;
        }

        .can-footer strong {
          color: #075334;
          letter-spacing: 1px;
        }

        @media (max-width: 900px) {
          .can-grid {
            grid-template-columns: 1fr;
          }

          .can-side {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .can-legend {
            grid-column: 1 / -1;
          }

          .can-slogan {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .can-hero-inner {
            min-height: 220px;
            padding: 65px 15px 22px;
            gap: 12px;
          }

          .can-brand {
            padding: 8px 18px;
          }

          .can-brand strong {
            font-size: 20px;
          }

          .can-caf-emblem {
            flex-basis: 55px;
          }

          .can-caf-emblem > span {
            width: 52px;
            height: 52px;
            border-width: 3px;
            font-size: 32px;
          }

          .can-caf-emblem strong {
            font-size: 15px;
            letter-spacing: 2px;
          }

          .can-eyebrow {
            font-size: 9px;
            letter-spacing: 1px;
          }

          .can-hero-title h1 {
            font-size: 36px;
          }

          .can-subtitle {
            font-size: 21px;
          }

          .can-hero-details {
            gap: 8px;
            margin-top: 12px;
            font-size: 11px;
          }

          .can-trophy {
            display: none;
          }

          .can-container {
            padding: 12px 10px;
          }

          .can-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 7px;
          }

          .can-tabs button {
            flex: 0 0 auto;
            min-height: 40px;
            padding: 9px 13px;
            font-size: 13px;
          }

          .can-section-head {
            min-height: 55px;
            gap: 8px;
            padding: 9px 12px;
          }

          .can-section-head h2 {
            font-size: 21px;
          }

          .can-cup {
            font-size: 23px;
          }

          .can-round {
            width: 100%;
            margin: 0;
            padding: 7px;
            text-align: center;
            font-size: 11px;
          }

          .can-side {
            display: flex;
            flex-direction: column;
          }

          .can-footer {
            font-size: 10px;
          }
        }
      `}</style>
    </main>
  );
}
