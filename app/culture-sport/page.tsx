// app/culture-sport/page.tsx
import Link from "next/link";

export default function CultureSportPage() {
  return (
    <main>
      <div className="wrap">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', margin: '30px 0', borderBottom: '2px solid var(--ink)', paddingBottom: '10px' }}>
          Culture & Sport
        </h1>
        
        {/* La Grille */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* 👇 LA NOUVELLE CARTE POUR LE FOOTBALL 👇 */}
          <Link href="/football" className="card">
            <div className="im" style={{ height: '200px', position: 'relative', backgroundColor: '#0f3d2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* On met un emoji ou une icône en attendant une vraie photo */}
              <span style={{ fontSize: '80px' }}>⚽</span>
              <span className="tag" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>Sport</span>
            </div>
            <div className="b">
              <h3>Football comorien : Championnats et Coupes</h3>
              <p style={{ fontSize: '14px', color: 'var(--mute)', marginTop: '5px' }}>
                Classements, résultats et calendriers des trois îles.
              </p>
              <span className="more">Voir les classements →</span>
            </div>
          </Link>

          

        </div>
      </div>
    </main>
  );
}