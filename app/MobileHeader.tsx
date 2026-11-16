"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MENU = [
  { name: "À la Une", href: "/" },
  { name: "Politique", href: "/politique" },
  { name: "Économie", href: "/economie" },
  { name: "Société", href: "/societe" },
  { name: "Santé", href: "/sante" },
  { name: "Diaspora", href: "/diaspora" },
  { name: "Monde / Afrique", href: "/monde-afrique" },
  { name: "Culture & Sport", href: "/culture-sport" },
  { name: "Décryptage", href: "/decryptage" },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [today, setToday] = useState("");
  const chipsRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Date du jour (calculée côté client pour éviter tout décalage d'hydratation)
  useEffect(() => {
    const d = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setToday(d.charAt(0).toUpperCase() + d.slice(1));
  }, []);

  // Ferme le menu / la recherche à chaque changement de page
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Bloque le scroll de la page quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Centre l'onglet actif dans la barre défilante
  useEffect(() => {
    const el = chipsRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [pathname]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <div className="m-header">
        <div className="m-bar">
          <button
            type="button"
            className="m-icon-btn"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link href="/" className="m-brand" aria-label="Le Nguu - Accueil">
            <img src="/logo.png" alt="" className="m-logo" />
            <span>LE NGUU</span>
          </Link>

          <button
            type="button"
            className="m-icon-btn"
            aria-label="Rechercher"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </div>

        {searchOpen && (
          <form className="m-search" onSubmit={onSearch}>
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article…"
              aria-label="Rechercher"
            />
            <button type="submit">OK</button>
          </form>
        )}

        <div className="m-chips" role="navigation" aria-label="Rubriques" ref={chipsRef}>
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href)}
              className={isActive(item.href) ? "on" : ""}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* MENU LATÉRAL */}
      <div className={`m-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="m-backdrop" onClick={() => setOpen(false)} />
        <div className="m-panel" role="dialog" aria-label="Menu">
          <div className="m-panel-head">
            <div>
              <strong>LE NGUU</strong>
              <small>{today}</small>
            </div>
            <button
              type="button"
              className="m-icon-btn"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <form className="m-panel-search" onSubmit={onSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              aria-label="Rechercher"
            />
          </form>

          <ul className="m-panel-list">
            {MENU.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={isActive(item.href) ? "on" : ""}>
                  {item.name}
                  <span aria-hidden>›</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="m-panel-extra">
            <a href="https://www.juwu.fr" target="_blank" rel="noopener noreferrer">JUWU.fr, la boutique</a>
            <a href="https://www.nguzoyamsomo.fr" target="_blank" rel="noopener noreferrer">Nguzo Ya Msomo</a>
            <a href="#" className="m-don">Soutenir Le Nguu</a>
          </div>

          <div className="m-panel-soc">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="YouTube">YouTube</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>
      </div>
    </>
  );
}
