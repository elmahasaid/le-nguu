
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ISLANDS,
  ISLAND_ORDER,
  LEAGUES,
  NATIONAL_CUP,
  NATIONAL_LEAGUE,
  NATIONAL_THEME,
  REGIONAL_CUPS,
  SEASON,
  type Division,
  type Island,
  type Zone,
} from "./data";
import {
  initials,
  parseMatches,
  parseStandings,
  slugify,
  sortStandings,
} from "./parse";
import Round from "../Round";

type Section = "championnat" | "coupes";
type ChampScope = "national" | Island;
type CupScope = "nationale" | "regionale";

/** Variables CSS de couleur d'une île */
const themeOf = (i: Island) =>
  ({
    "--fb-c": ISLANDS[i].color,
    "--fb-cd": ISLANDS[i].dark,
    "--fb-on": ISLANDS[i].on,
  }) as React.CSSProperties;

/** Couleurs du championnat national */
const nationalTheme = {
  "--fb-c": NATIONAL_THEME.color,
  "--fb-cd": NATIONAL_THEME.dark,
  "--fb-on": NATIONAL_THEME.on,
} as React.CSSProperties;

/* ---------- Briques d'affichage ---------- */

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="fb-empty">{children}</p>;
}

function ClubLogo({ name, size }: { name: string; size?: "m" }) {
  const [failed, setFailed] = useState(false);
  const extra = size === "m" ? " fb-logo-m" : "";

  if (failed) {
    return (
      <span className={`fb-logo-fallback${extra}`} aria-hidden>
        {initials(name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`fb-logo${extra}`}
      src={`/clubs/${slugify(name)}.png`}
      alt=""
      width={46}
      height={46}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function StandingsCard({
  kicker,
  title,
  phase,
  text,
  zones,
  autoSort,
  showLate,
  updated,
}: {
  kicker: string;
  title: string;
  phase?: string;
  text: string;
  zones: Zone[];
  autoSort?: boolean;
  showLate?: boolean;
  updated?: string;
}) {
  const rows = useMemo(() => {
    const r = parseStandings(text);
    return autoSort ? sortStandings(r) : r;
  }, [text, autoSort]);

  const maxPlayed = Math.max(0, ...rows.map((r) => r.played));
  const anyLate = !!showLate && rows.some((r) => r.played < maxPlayed);
  const showGoals = rows.some((r) => r.gf !== null || r.ga !== null);
  const showResults = rows.some(
    (r) => r.won !== null || r.drawn !== null || r.lost !== null
  );

  const zoneFor = (pos: number) =>
    zones.find((z) => pos >= z.from && pos <= (z.to ?? z.from));

  return (
    <section className="fb-card">
      <header className="fb-card-head">
        <div>
          <span className="fb-card-kicker">{kicker}</span>
          <h3>{title}</h3>
        </div>
        {phase && <em>{phase}</em>}
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
                  <th className="fb-logo-cell" aria-label="Logo" />
                  <th className="fb-club">Équipe</th>
                  <th className="fb-pts">Pts</th>
                  <th>MJ</th>
                  {showResults && <th>V</th>}
                  {showResults && <th>N</th>}
                  {showResults && <th>D</th>}
                  {showGoals && <th className="fb-hide-sm">BM</th>}
                  {showGoals && <th className="fb-hide-sm">BE</th>}
                  <th>Diff</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => {
                  const diff = r.diff;
                  const late = showLate ? maxPlayed - r.played : 0;
                  const z = zoneFor(i + 1);

                  return (
                    <tr
                      key={r.club}
                      className={z ? `fb-z-${z.type}` : ""}
                    >
                      <td className="fb-pos">{i + 1}</td>

                      <td className="fb-logo-cell">
                        <ClubLogo name={r.club} />
                      </td>

                      <td className="fb-club">{r.club}</td>
                      <td className="fb-pts">{r.points}</td>

                      <td>
                        {late > 0 && (
                          <span
                            className="fb-late"
                            title={`${late} match(s) en moins`}
                          >
                            −{late}
                          </span>
                        )}
                        {r.played}
                      </td>

                      {showResults && <td>{r.won ?? "–"}</td>}
                      {showResults && <td>{r.drawn ?? "–"}</td>}
                      {showResults && <td>{r.lost ?? "–"}</td>}

                      {showGoals && (
                        <td className="fb-hide-sm">{r.gf ?? "–"}</td>
                      )}

                      {showGoals && (
                        <td className="fb-hide-sm">{r.ga ?? "–"}</td>
                      )}

                      <td>{diff > 0 ? `+${diff}` : diff}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <footer className="fb-card-foot">
            <div className="fb-legend">
              {zones.map((z) => (
                <span key={`${z.type}-${z.from}`}>
                  <i className={`fb-dot fb-dot-${z.type}`} /> {z.label}
                </span>
              ))}

              {anyLate && (
                <span>
                  <i className="fb-late">−1</i> Match(s) en moins
                </span>
              )}
            </div>

            <div className="fb-foot-right">
              {updated ? `Mis à jour le ${updated} · ` : ""}
              Le Nguu
            </div>
          </footer>
        </>
      )}
    </section>
  );
}

/* ---------- Matchs et journées dépliables ---------- */

function MatchList({ text, empty }: { text: string; empty: string }) {
  const groups = useMemo(() => {
    const out: {
      round: string;
      matches: ReturnType<typeof parseMatches>;
    }[] = [];

    for (const m of parseMatches(text)) {
      const round = m.round ?? "Matchs";
      const last = out[out.length - 1];

      if (last && last.round === round) {
        last.matches.push(m);
      } else {
        out.push({
          round,
          matches: [m],
        });
      }
    }

    return out;
  }, [text]);

  if (groups.length === 0) {
    return <Empty>{empty}</Empty>;
  }

  return (
    <>
      {groups.map((g, index) => (
        <Round
          key={`${g.round}-${index}`}
          title={g.round}
          count={g.matches.length}
          defaultOpen={false}
        >
          {g.matches.map((m, i) => {
            const played =
              m.scoreHome !== undefined &&
              m.scoreAway !== undefined;

            return (
              <li
                key={`${m.home}-${m.away}-${i}`}
                className="fb-match"
              >
                <span className="fb-date">{m.date}</span>

                <span className="fb-home fb-team">
                  <span>{m.home}</span>
                  <ClubLogo name={m.home} size="m" />
                </span>

                <span
                  className={`fb-score ${played ? "" : "fb-todo"}`}
                >
                  {played
                    ? `${m.scoreHome} - ${m.scoreAway}`
                    : "–"}
                </span>

                <span className="fb-away fb-team">
                  <ClubLogo name={m.away} size="m" />
                  <span>{m.away}</span>
                </span>

                {m.pens && (
                  <span className="fb-pens">
                    t.a.b. {m.pens}
                  </span>
                )}

                {m.venue && (
                  <span className="fb-venue">{m.venue}</span>
                )}
              </li>
            );
          })}
        </Round>
      ))}
    </>
  );
}

/* ---------- Boutons de navigation ---------- */

function Pills<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: {
    id: T;
    label: string;
    sub?: string;
    style?: React.CSSProperties;
  }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="fb-pills" role="tablist" aria-label={label}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          role="tab"
          aria-selected={value === it.id}
          className={`${value === it.id ? "on" : ""} ${
            it.style ? "isl" : ""
          }`}
          style={it.style}
          onClick={() => onChange(it.id)}
        >
          {it.label}
          {it.sub && <small>{it.sub}</small>}
        </button>
      ))}
    </div>
  );
}

/* ---------- Championnat ---------- */

function IslandLeague({ island }: { island: Island }) {
  const divisions = LEAGUES[island];
  const [idx, setIdx] = useState(0);
  const d: Division = divisions[idx] ?? divisions[0];

  return (
    <div className="fb-theme" style={themeOf(island)}>
      <Pills
        label="Division"
        value={String(idx)}
        onChange={(v) => setIdx(Number(v))}
        items={divisions.map((div, i) => ({
          id: String(i),
          label: div.label,
        }))}
      />

      <StandingsCard
        kicker={`Championnat de ${ISLANDS[island].name} · ${SEASON}`}
        title={`Classement · ${d.label}`}
        phase={d.phase}
        text={d.table}
        zones={d.zones}
        autoSort={d.autoSort}
        showLate={d.showLate}
        updated={d.updated}
      />

      <h3 className="fb-h3">Résultats et calendrier</h3>

      <MatchList
        text={d.matches}
        empty="Aucun match publié pour le moment."
      />
    </div>
  );
}

function NationalLeague() {
  return (
    <div className="fb-theme" style={nationalTheme}>
      <p className="fb-intro">
        La phase nationale réunit les champions des ligues de Ngazidja,
        Ndzuani et Mwali.
      </p>

      {NATIONAL_LEAGUE.champion && (
        <div className="fb-champ">
          <span>Champion des Comores</span>
          <strong>{NATIONAL_LEAGUE.champion}</strong>
        </div>
      )}

      <StandingsCard
        kicker={`Championnat des Comores · ${SEASON}`}
        title="Phase nationale"
        text={NATIONAL_LEAGUE.table}
        zones={NATIONAL_LEAGUE.zones}
        updated={NATIONAL_LEAGUE.updated}
      />

      <h3 className="fb-h3">Résultats et calendrier</h3>

      <MatchList
        text={NATIONAL_LEAGUE.matches}
        empty="Aucun match publié pour le moment."
      />
    </div>
  );
}

function Championnat() {
  const [scope, setScope] = useState<ChampScope>("national");

  return (
    <>
      <Pills<ChampScope>
        label="Niveau du championnat"
        value={scope}
        onChange={setScope}
        items={[
          {
            id: "national",
            label: "National",
            style: nationalTheme,
          },
          ...ISLAND_ORDER.map((i) => ({
            id: i as ChampScope,
            label: ISLANDS[i].name,
            sub: ISLANDS[i].alt,
            style: themeOf(i),
          })),
        ]}
      />

      {scope === "national" ? (
        <NationalLeague />
      ) : (
        <IslandLeague key={scope} island={scope} />
      )}
    </>
  );
}

/* ---------- Coupes ---------- */

function Coupes() {
  const [scope, setScope] = useState<CupScope>("nationale");
  const [island, setIsland] = useState<Island>("ngazidja");

  return (
    <>
      <Pills<CupScope>
        label="Phase de la coupe"
        value={scope}
        onChange={setScope}
        items={[
          { id: "nationale", label: "Phase nationale" },
          { id: "regionale", label: "Phases régionales" },
        ]}
      />

      {scope === "nationale" ? (
        <div className="fb-theme" style={nationalTheme}>
          <p className="fb-intro">
            Les vainqueurs des coupes régionales se retrouvent en phase
            nationale.
          </p>

          {NATIONAL_CUP.holder && (
            <div className="fb-champ">
              <span>Tenant du titre</span>
              <strong>{NATIONAL_CUP.holder}</strong>
            </div>
          )}

          <h3 className="fb-h3">
            Coupe des Comores {SEASON} · phase nationale
          </h3>

          <MatchList
            text={NATIONAL_CUP.matches}
            empty="Le tableau de la phase nationale sera publié bientôt."
          />
        </div>
      ) : (
        <>
          <Pills<Island>
            label="Île"
            value={island}
            onChange={setIsland}
            items={ISLAND_ORDER.map((i) => ({
              id: i,
              label: ISLANDS[i].name,
              sub: ISLANDS[i].alt,
              style: themeOf(i),
            }))}
          />

          <div className="fb-theme" style={themeOf(island)}>
            <h3 className="fb-h3">
              Coupe de {ISLANDS[island].name} ({ISLANDS[island].alt})
            </h3>

            <MatchList
              text={REGIONAL_CUPS[island]}
              empty="Le tableau de cette coupe régionale sera publié bientôt."
            />
          </div>
        </>
      )}
    </>
  );
}

/* ---------- Page principale ---------- */

export default function FootballTabs() {
  const [section, setSection] = useState<Section>("championnat");

  // Permet les liens directs : /football#coupes
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");

      if (h === "coupes" || h === "championnat") {
        setSection(h);
      }
    };

    apply();

    window.addEventListener("hashchange", apply);

    return () => {
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  const choose = (s: Section) => {
    setSection(s);
    history.replaceState(null, "", `#${s}`);
  };

  return (
    <div className="fb">
      <div
        className="fb-sections"
        role="tablist"
        aria-label="Rubrique football"
      >
        <button
          type="button"
          role="tab"
          aria-selected={section === "championnat"}
          className={section === "championnat" ? "on" : ""}
          onClick={() => choose("championnat")}
        >
          Championnat
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={section === "coupes"}
          className={section === "coupes" ? "on" : ""}
          onClick={() => choose("coupes")}
        >
          Coupes des Comores
        </button>
      </div>

      <div className="fb-panel">
        {section === "championnat" ? (
          <Championnat />
        ) : (
          <Coupes />
        )}
      </div>
    </div>
  );
}
