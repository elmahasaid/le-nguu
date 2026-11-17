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
          
          {/* 👇 LA CARTE FOOTBALL (Ton code existant, inchangé) 👇 */}
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

          {/* 👇 LA NOUVELLE CARTE BASKET 👇 */}
          <Link href="/basket" className="card">
            <div className="im" style={{ height: '200px', position: 'relative', backgroundColor: '#0f3d2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Emoji en attendant une vraie photo */}
              <span style={{ fontSize: '80px' }}>🏀</span>
              <span className="tag" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>Sport</span>
            </div>
            <div className="b">
              <h3>Basket-ball comorien : Championnats régionaux et national</h3>
              <p style={{ fontSize: '14px', color: 'var(--mute)', marginTop: '5px' }}>
                Classements et résultats des catégories Excellence, Honneur et Dames.
              </p>
              <span className="more">Voir les classements →</span>
            </div>
          </Link>

          {/* 👇 LA NOUVELLE CARTE CAN 2027 👇 */}
          <Link href="/can-2027" className="card">
            <div className="im" style={{ height: '200px', position: 'relative', backgroundColor: '#0f3d2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* 👇 TON IMAGE ICI 👇 */}
              <img 
                src="/can2027.png" 
                alt="Logo CAN 2027" 
                style={{ height: '100px', width: 'auto', objectFit: 'contain' }} 
              />
              
              <span className="tag" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>Sport</span>
              
              {/* Petit badge pour attirer l'œil */}
              <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e63946', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Dossier Spécial
              </span>
            </div>
            <div className="b">
              <h3>Éliminatoires CAN 2027</h3>
              <p style={{ fontSize: '14px', color: 'var(--mute)', marginTop: '5px' }}>
                Classements des 12 groupes et résultats pour la phase finale.
              </p>
              <span className="more">Voir les classements →</span>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}