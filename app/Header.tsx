
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [activeTab, setActiveTab] = useState("À la Une");

  const menuItems = [
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

  return (
    <>
      <div className="top">
        <div className="in">
          <em>Informer · Éclairer · Rassembler</em>

          <div className="tr">
            <label className="srch">
              🔍 <input type="search" placeholder="Rechercher…" />
            </label>

            <div className="soc">
              <a href="#">f</a>
              <a href="#">X</a>
              <a href="#">▶</a>
              <a href="#">in</a>
            </div>
          </div>
        </div>
      </div>

      <header
        className="mast"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-30px",
            width: "300px",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <svg
            viewBox="-100 -100 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle r="95" />
            <ellipse rx="95" ry="38" />
            <ellipse rx="38" ry="95" />
            <ellipse rx="70" ry="95" />
            <path d="M-95 0H95M-82 -48H82M-82 48H82" />
          </svg>
        </div>

        <div
          className="in"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="logo-container">
            <Image
              src="/logo.png"
              alt="Le Nguu"
              width={120}
              height={120}
              style={{
                objectFit: "contain",
                width: "120px",
                height: "120px",
              }}
              priority
            />
          </div>

          <div className="brand">
            <h1>LE NGUU</h1>
            <p>LE JOURNAL DES COMORES ET D’AILLEURS</p>
          </div>

          <div className="slogan">
            Une information fiable,
            <br />
            pour comprendre notre monde
          </div>
        </div>
      </header>

      <nav>
        <div className="in">
          <Link className="home" href="/">
            🏠
          </Link>

          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={activeTab === item.name ? "on" : ""}
              onClick={() => setActiveTab(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
