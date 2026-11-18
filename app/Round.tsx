
"use client";

import { useState, type ReactNode } from "react";

export default function Round({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`fb-round${open ? " open" : ""}`}>
      <button
        type="button"
        className="fb-round-head"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="fb-round-title">{title}</span>

        <span className="fb-round-count">
          {count} match{count > 1 ? "s" : ""}
        </span>

        <span className="fb-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && <ul>{children}</ul>}
    </div>
  );
}
