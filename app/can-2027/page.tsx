import Link from "next/link";

// Données des 12 groupes (Classement après la 3e journée - Nov 2026)
const GROUPS = [
  {
    name: "Groupe A",
    teams: [
      { pos: 1, team: "Maroc", code: "ma", pts: 9, diff: "+8" },
      { pos: 2, team: "Gabon", code: "ga", pts: 6, diff: "+2" },
      { pos: 3, team: "Niger", code: "ne", pts: 3, diff: "-5" },
      { pos: 4, team: "Lesotho", code: "ls", pts: 0, diff: "-5" },
    ],
  },
  {
    name: "Groupe B",
    teams: [
      { pos: 1, team: "Égypte", code: "eg", pts: 7, diff: "+10" },
      { pos: 2, team: "Angola", code: "ao", pts: 7, diff: "+4" },
      { pos: 3, team: "Malawi", code: "mw", pts: 3, diff: "-6" },
      { pos: 4, team: "Soudan du Sud", code: "ss", pts: 0, diff: "-8" },
    ],
  },
  {
    name: "Groupe C",
    teams: [
      { pos: 1, team: "Côte d'Ivoire", code: "ci", pts: 9, diff: "+5" },
      { pos: 2, team: "Gambie", code: "gm", pts: 6, diff: "+2" },
      { pos: 3, team: "Ghana", code: "gh", pts: 3, diff: "-2" },
      { pos: 4, team: "Somalie", code: "so", pts: 0, diff: "-5" },
    ],
  },
  {
    name: "Groupe D",
    teams: [
      { pos: 1, team: "Afrique du Sud", code: "za", pts: 7, diff: "+6" },
      { pos: 2, team: "Guinée", code: "gn", pts: 6, diff: "+1" },
      { pos: 3, team: "Kenya", code: "ke", pts: 2, diff: "-1" },
      { pos: 4, team: "Érythrée", code: "er", pts: 1, diff: "-6" },
    ],
  },
  {
    name: "Groupe E",
    teams: [
      { pos: 1, team: "RD Congo", code: "cd", pts: 9, diff: "+5" },
      { pos: 2, team: "Zimbabwe", code: "zw", pts: 4, diff: "0" },
      { pos: 3, team: "Guinée équatoriale", code: "gq", pts: 4, diff: "-1" },
      { pos: 4, team: "Sierra Leone", code: "sl", pts: 0, diff: "-4" },
    ],
  },
  {
    name: "Groupe F",
    teams: [
      { pos: 1, team: "Bénin", code: "bj", pts: 7, diff: "+4" },
      { pos: 2, team: "Burkina Faso", code: "bf", pts: 7, diff: "+2" },
      { pos: 3, team: "Mauritanie", code: "mr", pts: 3, diff: "0" },
      { pos: 4, team: "Centrafrique", code: "cf", pts: 0, diff: "-6" },
    ],
  },
  {
    name: "Groupe G",
    teams: [
      { pos: 1, team: "Cameroun", code: "cm", pts: 7, diff: "+4" },
      { pos: 2, team: "Comores", code: "km", pts: 4, diff: "-1" },
      { pos: 3, team: "Namibie", code: "na", pts: 3, diff: "-2" },
      { pos: 4, team: "Congo", code: "cg", pts: 2, diff: "-1" },
    ],
  },
  {
    name: "Groupe H",
    teams: [
      { pos: 1, team: "Ouganda", code: "ug", pts: 5, diff: "+1" },
      { pos: 2, team: "Libye", code: "ly", pts: 4, diff: "+1" },
      { pos: 3, team: "Botswana", code: "bw", pts: 3, diff: "0" },
      { pos: 4, team: "Tunisie", code: "tn", pts: 2, diff: "-2" },
    ],
  },
  {
    name: "Groupe I",
    teams: [
      { pos: 1, team: "Algérie", code: "dz", pts: 7, diff: "+3" },
      { pos: 2, team: "Zambie", code: "zm", pts: 4, diff: "0" },
      { pos: 3, team: "Togo", code: "tg", pts: 3, diff: "-2" },
      { pos: 4, team: "Burundi", code: "bi", pts: 2, diff: "-1" },
    ],
  },
  {
    name: "Groupe J",
    teams: [
      { pos: 1, team: "Sénégal", code: "sn", pts: 7, diff: "+4" },
      { pos: 2, team: "Mozambique", code: "mz", pts: 4, diff: "+2" },
      { pos: 3, team: "Soudan", code: "sd", pts: 3, diff: "-5" },
      { pos: 4, team: "Éthiopie", code: "et", pts: 3, diff: "-1" },
    ],
  },
  {
    name: "Groupe K",
    teams: [
      { pos: 1, team: "Mali", code: "ml", pts: 9, diff: "+4" },
      { pos: 2, team: "Rwanda", code: "rw", pts: 6, diff: "+1" },
      { pos: 3, team: "Cap-Vert", code: "cv", pts: 3, diff: "-1" },
      { pos: 4, team: "Liberia", code: "lr", pts: 0, diff: "-4" },
    ],
  },
  {
    name: "Groupe L",
    teams: [
      { pos: 1, team: "Guinée-Bissau", code: "gw", pts: 7, diff: "+5" },
      { pos: 2, team: "Nigeria", code: "ng", pts: 6, diff: "+3" },
      { pos: 3, team: "Madagascar", code: "mg", pts: 2, diff: "-2" },
      { pos: 4, team: "Tanzanie", code: "tz", pts: 1, diff: "-4" },
    ],
  },
];

export default function Can2027Page() {
  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Fil d'Ariane */}
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>CAN 2027</span>
        </div>
        
        {/* En-tête avec le logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", borderBottom: "2px solid var(--ink)", paddingBottom: "20px", marginBottom: "30px" }}>
          
          {/* 👇 CORRECTION ICI : On utilise <img> classique 👇 */}
          <div style={{ width: "100px", height: "100px", position: "relative", flexShrink: 0 }}>
            <img 
              src="/can2027.png" 
              alt="Logo CAN 2027" 
              style={{ width: "100%", height: "100%", objectFit: "contain" }} 
            />
          </div>
          
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", margin: 0 }}>
            Éliminatoires CAN 2027
          </h1>
        </div>

        {/* Petit résumé de la compétition */}
        <div style={{ backgroundColor: "var(--paper)", borderLeft: "4px solid var(--green2)", padding: "20px", marginBottom: "40px", borderRadius: "4px" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "17px", lineHeight: "1.6", color: "var(--ink)", margin: 0 }}>
            La Coupe d'Afrique des Nations 2027 se déroulera au <strong>Kenya, en Ouganda et en Tanzanie</strong>. 
            Au total, 24 équipes participeront à la phase finale. Les éliminatoires sont divisés en 12 groupes de 4 équipes.
            <br /><br />
            <strong>Règle de qualification :</strong> Les deux premiers de chaque groupe (soit 24 équipes) valident directement leur ticket pour la CAN. 
            Les équipes surlignées en vert ci-dessous sont actuellement en position de se qualifier.
          </p>
        </div>

        {/* Grille des groupes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
          {GROUPS.map((group) => (
            <div key={group.name} style={{ backgroundColor: "var(--paper)", border: "1px solid var(--rule)", borderRadius: "8px", overflow: "hidden" }}>
              
              {/* En-tête du groupe */}
              <div style={{ backgroundColor: "var(--green)", color: "white", padding: "12px 15px", fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "bold" }}>
                {group.name}
              </div>
              
              {/* Tableau */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--rule)", color: "var(--mute)", textAlign: "left" }}>
                    <th style={{ padding: "8px 10px", width: "30px" }}>#</th>
                    <th style={{ padding: "8px 10px" }}>Équipe</th>
                    <th style={{ padding: "8px 10px", textAlign: "center" }}>Pts</th>
                    <th style={{ padding: "8px 10px", textAlign: "center" }}>Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((row) => (
                    <tr key={row.team} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", backgroundColor: row.pos <= 2 ? "rgba(31, 138, 60, 0.08)" : "transparent" }}>
                      <td style={{ padding: "10px", fontWeight: "bold", color: row.pos <= 2 ? "var(--green2)" : "var(--mute)" }}>{row.pos}</td>
                      
                      {/* Ligne avec le drapeau et le nom de l'équipe */}
                      <td style={{ padding: "10px", fontWeight: row.pos <= 2 ? "bold" : "normal", display: "flex", alignItems: "center", gap: "8px" }}>
                        <img 
                          src={`https://flagcdn.com/w20/${row.code}.png`} 
                          alt={`Drapeau ${row.team}`} 
                          style={{ width: "20px", height: "auto", borderRadius: "2px", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} 
                        />
                        {row.team}
                      </td>
                      
                      <td style={{ padding: "10px", textAlign: "center", fontWeight: "bold" }}>{row.pts}</td>
                      <td style={{ padding: "10px", textAlign: "center", color: "var(--mute)" }}>{row.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}