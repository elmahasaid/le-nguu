"use client";

import { useMemo, useState } from "react";
import { NATIONAL_THEME, type Zone } from "../football/data";
import { parseMatches, parseStandings } from "../football/parse";
import {
  CAN_GROUPS,
  CAN_HIGHLIGHT,
  CAN_TITLE,
  CAN_UPDATED,
  CAN_ZONES,
  type CanGroup,
} from "./data";
import Round from "../Round";

/** Vert Le Nguu pour toute la page */
const theme = {
  "--fb-c": NATIONAL_THEME.color,
  "--fb-cd": NATIONAL_THEME.dark,
  "--fb-on": NATIONAL_THEME.on,
} as React.CSSProperties;

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/* ---------- Classement d'un groupe ---------- */

function GroupCard({ group, zones }: { group: CanGroup; zones: Zone[] }) {
  const rows = useMemo(() => parseStandings(group.table), [group.table]);
  const hasMe = rows.some((r) => same(r.club, CAN_HIGHLIGHT));
  const zoneFor = (pos: number) =>
    zones.find((z) => pos >= z.from && pos <= (z.to ?? z.from));
  const legend = zones.filter((z) => z.label.trim() !== "");

  return (
    <section className="fb-card can-card">
      <header className="fb-card-head">
        <div>
          <span className="fb-card-kicker">{CAN_TITLE}</span>
          <h3>Groupe {group.id}</h3>
        </div>
        {hasMe && <em>Groupe des {CAN_HIGHLIGHT}</em>}
      </header>

      {rows.length === 0 ? (
        <p className="fb-card-empty">Classement à venir.</p>
      ) : (
        <>
          <div className="fb-scroll">
            <table className="fb-table">
              <thead>
                <tr>
                  <th className="fb-pos">#</th>
                  <th className="fb-club">Équipe</th>
                  <th className="fb-pts">Pts</th>
                  <th>MJ</th>
                  <th>V</th>
                  <th>N</th>
                  <th>D</th>
                  <th className="fb-hide-sm">BM</th>
                  <th className="fb-hide-sm">BE</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const z = zoneFor(i + 1);
                  const me = same(r.club, CAN_HIGHLIGHT);
                  const cls = [z ? `fb-z-${z.type}` : "", me ? "can-me" : ""].join(" ").trim();
                  return (
                    <tr key={r.club} className={cls}>
                      <td className="fb-pos">{i + 1}</td>
                      <td className="fb-club">{r.club}</td>
                      <td className="fb-pts">{r.points}</td>
                      <td>{r.played}</td>
                      <td>{r.won ?? "–"}</td>
                      <td>{r.drawn ?? "–"}</td>
                      <td>{r.lost ?? "–"}</td>
                      <td className="fb-hide-sm">{r.gf ?? "–"}</td>
                      <td className="fb-hide-sm">{r.ga ?? "–"}</td>
                      <td>{r.diff > 0 ? `+${r.diff}` : r.diff}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <footer className="fb-card-foot">
            <div className="fb-legend">
              {legend.map((z) => (
                <span key={`${z.type}-${z.from}`}>
                  <i className={`fb-dot fb-dot-${z.type}`} /> {z.label}
                </span>
              ))}
            </div>
            <div className="fb-foot-right">
              {CAN_UPDATED ? `Mis à jour le ${CAN_UPDATED} · ` : ""}Le Nguu
            </div>
          </footer>
        </>
      )}
    </section>
  );
}

/* ---------- Résultats d'un groupe ---------- */

function Results({ text }: { text: string }) {
  const groups = useMemo(() => {
    const out: { round: string; matches: ReturnType<typeof parseMatches> }[] = [];
    for (const m of parseMatches(text)) {
      const round = m.round ?? "Matchs";
      const last = out[out.length - 1];
      if (last && last.round === round) last.matches.push(m);
      else out.push({ round, matches: [m] });
    }
    return out;
  }, [text]);

  if (groups.length === 0) return <p className="fb-empty">Résultats à venir.</p>;

  return (
    <>
      {groups.map((g) => (
        <Round key={g.round} title={g.round} count={g.matches.length} defaultOpen={false}>
            {g.matches.map((m, i) => {
              const played = m.scoreHome !== undefined && m.scoreAway !== undefined;
              return (
                <li key={`${m.home}-${m.away}-${i}`} className="fb-match">
                  <span className="fb-date">{m.date}</span>
                  <span className="fb-home">{m.home}</span>
                  <span className={`fb-score ${played ? "" : "fb-todo"}`}>
                    {played ? `${m.scoreHome} - ${m.scoreAway}` : "–"}
                  </span>
                  <span className="fb-away">{m.away}</span>
                </li>
              );
            })}
      </Round>
      ))}
    </>
  );
}

/* ---------- Page ---------- */

export default function CanTabs() {
  const [scope, setScope] = useState<string>("all"); // "all" ou la lettre d'un groupe
  const current = CAN_GROUPS.find((g) => g.id === scope);

  return (
    <div className="fb can" style={theme}>
      <div className="fb-panel">
        <div className="fb-pills" role="tablist" aria-label="Groupes">
          <button
            type="button"
            role="tab"
            aria-selected={scope === "all"}
            className={scope === "all" ? "on" : ""}
            onClick={() => setScope("all")}
          >
            Tous les groupes
          </button>
          {CAN_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={scope === g.id}
              className={scope === g.id ? "on" : ""}
              onClick={() => setScope(g.id)}
            >
              Groupe {g.id}
            </button>
          ))}
        </div>

        {current ? (
          <>
            <GroupCard group={current} zones={CAN_ZONES} />
            <h3 className="fb-h3">Résultats</h3>
            <Results text={current.matches} />
          </>
        ) : (
          <div className="can-grid">
            {CAN_GROUPS.map((g) => (
              <GroupCard key={g.id} group={g} zones={CAN_ZONES} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
