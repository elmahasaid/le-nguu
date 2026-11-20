"use client";

import { useMemo, useState } from "react";
import {
  ISLANDS,
  ISLAND_ORDER,
  NATIONAL_THEME,
  type Island,
  type Zone,
} from "../football/data";
import { initials, parseMatches, slugify } from "../football/parse";
import { BASKET_LEAGUES, BASKET_NATIONAL, BASKET_SEASON, type BasketCategory } from "./data";
import { parseBasketStandings, sortBasket } from "./parse";
import Round from "../Round";

type Scope = "national" | Island;

/** Variables CSS de couleur d'une île (bleu / rouge / jaune) */
const themeOf = (i: Island) =>
  ({
    "--fb-c": ISLANDS[i].color,
    "--fb-cd": ISLANDS[i].dark,
    "--fb-on": ISLANDS[i].on,
  }) as React.CSSProperties;

/** Le championnat national est en vert Le Nguu */
const nationalTheme = {
  "--fb-c": NATIONAL_THEME.color,
  "--fb-cd": NATIONAL_THEME.dark,
  "--fb-on": NATIONAL_THEME.on,
} as React.CSSProperties;

/* ---------- Briques d'affichage ---------- */

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="fb-empty">{children}</p>;
}

function Ball() {
  return (
    <svg
      className="bk-ball"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5v19M5.2 5.2c3.2 3.2 3.2 10.4 0 13.6M18.8 5.2c-3.2 3.2-3.2 10.4 0 13.6" />
    </svg>
  );
}

// Les logos du basket sont dans public/clubs-basket/ (séparés des logos de football : public/clubs/)
// Nom du fichier : nom du club en minuscules, sans accent, avec des tirets. Ex. djabal-basket.png
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
      src={`/clubs-basket/${slugify(name)}.png`}
      alt=""
      width={46}
      height={46}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function BasketStandings({
  kicker,
  title,
  phase,
  text,
  zones,
  autoSort,
  updated,
}: {
  kicker: string;
  title: string;
  phase?: string;
  text: string;
  zones: Zone[];
  autoSort?: boolean;
  updated?: string;
}) {
  const rows = useMemo(() => {
    const r = parseBasketStandings(text);
    return autoSort ? sortBasket(r) : r;
  }, [text, autoSort]);

  // les colonnes PM / PE / F ne s'affichent que si elles servent
  const showPoints = rows.some((r) => r.pf !== null || r.pa !== null);
  const showForfeits = rows.some((r) => r.forfeits > 0);
  const zoneFor = (pos: number) =>
    zones.find((z) => pos >= z.from && pos <= (z.to ?? z.from));
  const legend = zones.filter((z) => z.label.trim() !== "");

  return (
    <section className="fb-card">
      <header className="fb-card-head">
        <div>
          <span className="fb-card-kicker">{kicker}</span>
          <h3>{title}</h3>
        </div>
        <div className="bk-head-right">
          <Ball />
          {phase && <em>{phase}</em>}
        </div>
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
                  <th>V</th>
                  <th>D</th>
                  {showForfeits && (
                    <th className="fb-hide-sm" title="Forfaits">
                      F
                    </th>
                  )}
                  {showPoints && <th className="fb-hide-sm">PM</th>}
                  {showPoints && <th className="fb-hide-sm">PE</th>}
                  <th>Moy</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const pos = r.rank ?? i + 1;
                  const z = zoneFor(pos);
                  return (
                    <tr key={r.club} className={z ? `fb-z-${z.type}` : ""}>
                      <td className="fb-pos">{pos}</td>
                      <td className="fb-logo-cell">
                        <ClubLogo name={r.club} />
                      </td>
                      <td className="fb-club">{r.club}</td>
                      <td className="fb-pts">{r.points}</td>
                      <td>{r.played}</td>
                      <td>{r.won}</td>
                      <td>{r.lost}</td>
                      {showForfeits && <td className="fb-hide-sm">{r.forfeits || "–"}</td>}
                      {showPoints && <td className="fb-hide-sm">{r.pf ?? "–"}</td>}
                      {showPoints && <td className="fb-hide-sm">{r.pa ?? "–"}</td>}
                      <td className={r.avg > 0 ? "bk-avg-pos" : r.avg < 0 ? "bk-avg-neg" : ""}>
                        {r.avg > 0 ? `+${r.avg}` : r.avg}
                      </td>
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
              <span>PM / PE : points marqués / encaissés · Moy : points average</span>
              {showForfeits && <span>F : forfaits (comptés dans les défaites)</span>}
            </div>
            <div className="fb-foot-right">
              {updated ? `Mis à jour le ${updated} · ` : ""}Le Nguu
            </div>
          </footer>
        </>
      )}
    </section>
  );
}

function MatchList({ text, empty }: { text: string; empty: string }) {
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

  if (groups.length === 0) return <Empty>{empty}</Empty>;

  return (
    <>
      {groups.map((g) => (
        <Round key={g.round} title={g.round} count={g.matches.length} defaultOpen={false}>
            {g.matches.map((m, i) => {
              const played = m.scoreHome !== undefined && m.scoreAway !== undefined;
              const homeWon = played && m.scoreHome! > m.scoreAway!;
              const awayWon = played && m.scoreAway! > m.scoreHome!;
              return (
                <li key={`${m.home}-${m.away}-${i}`} className="fb-match">
                  <span className="fb-date">{m.date}</span>
                  <span className={`fb-home fb-team${homeWon ? " bk-win" : ""}`}>
                    <span>{m.home}</span>
                    <ClubLogo name={m.home} size="m" />
                  </span>
                  <span className={`fb-score ${played ? "" : "fb-todo"}`}>
                    {played ? `${m.scoreHome} - ${m.scoreAway}` : "–"}
                  </span>
                  <span className={`fb-away fb-team${awayWon ? " bk-win" : ""}`}>
                    <ClubLogo name={m.away} size="m" />
                    <span>{m.away}</span>
                  </span>
                </li>
              );
            })}
      </Round>
      ))}
    </>
  );
}

function Pills<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: { id: T; label: string; sub?: string; style?: React.CSSProperties }[];
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
          className={`${value === it.id ? "on" : ""} ${it.style ? "isl" : ""}`}
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

/* ---------- Une catégorie : classement + résultats ---------- */

function CategoryView({ category, kicker }: { category: BasketCategory; kicker: string }) {
  return (
    <>
      <BasketStandings
        kicker={kicker}
        title={category.title}
        phase={category.phase}
        text={category.table}
        zones={category.zones}
        autoSort={category.autoSort}
        updated={category.updated}
      />

      <h3 className="fb-h3">Résultats</h3>
      <MatchList text={category.matches} empty="Aucun résultat publié pour le moment." />
    </>
  );
}

function IslandBasket({ island }: { island: Island }) {
  const categories = BASKET_LEAGUES[island];
  const [idx, setIdx] = useState(0);
  const c = categories[idx] ?? categories[0];

  return (
    <div className="fb-theme" style={themeOf(island)}>
      <Pills
        label="Catégorie"
        value={String(idx)}
        onChange={(v) => setIdx(Number(v))}
        items={categories.map((cat, i) => ({ id: String(i), label: cat.label }))}
      />
      <CategoryView
        category={c}
        kicker={`Basket-ball · Championnat régional de ${ISLANDS[island].name} · ${BASKET_SEASON}`}
      />
    </div>
  );
}

function NationalBasket() {
  return (
    <div className="fb-theme" style={nationalTheme}>
      <p className="fb-intro">
        Le championnat national réunit les meilleures équipes des ligues de Ngazidja, Ndzuani et Mwali.
      </p>
      <CategoryView category={BASKET_NATIONAL} kicker={`Basket-ball · Championnat des Comores · ${BASKET_SEASON}`} />
    </div>
  );
}

/* ---------- Page ---------- */

export default function BasketTabs() {
  const [scope, setScope] = useState<Scope>("ngazidja");

  return (
    <div className="fb bk">
      <div className="fb-panel">
        <Pills<Scope>
          label="Niveau du championnat"
          value={scope}
          onChange={setScope}
          items={[
            { id: "national", label: "National", style: nationalTheme },
            ...ISLAND_ORDER.map((i) => ({
              id: i as Scope,
              label: ISLANDS[i].name,
              sub: ISLANDS[i].alt,
              style: themeOf(i),
            })),
          ]}
        />
        {scope === "national" ? <NationalBasket /> : <IslandBasket key={scope} island={scope} />}
      </div>
    </div>
  );
}
