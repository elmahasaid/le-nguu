"use client";

import { useRouter } from "next/navigation";

/**
 * Bouton « Retour » : revient à la page précédente.
 * Si la page a été ouverte directement (nouvel onglet, lien partagé), il mène à la page de repli.
 *
 * Utilisation :  <BackButton fallbackHref="/societe" />
 */
export default function BackButton({
  fallbackHref = "/",
  label = "Retour",
}: {
  fallbackHref?: string;
  label?: string;
}) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button type="button" className="ar-back" onClick={goBack} aria-label={`${label} à la page précédente`}>
      <span aria-hidden>←</span> {label}
    </button>
  );
}
