"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Liste complète des villes (Comores, Afrique, Monde)
const CITIES = [
  { name: "Moroni", lat: -11.7042, lon: 43.2402, tz: "Indian/Comoro" },
  { name: "Iconi", lat: -11.7333, lon: 43.2333, tz: "Indian/Comoro" },
  { name: "Mutsamudu", lat: -12.1667, lon: 44.4000, tz: "Indian/Comoro" },
  { name: "Fomboni", lat: -12.2833, lon: 43.7500, tz: "Indian/Comoro" },
  { name: "Paris (Diaspora)", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { name: "Marseille", lat: 43.2965, lon: 5.3698, tz: "Europe/Paris" },
  { name: "Dakar", lat: 14.7167, lon: -17.4667, tz: "Africa/Dakar" },
  { name: "Rabat", lat: 34.0209, lon: -6.8416, tz: "Africa/Casablanca" },
  { name: "Nairobi", lat: -1.2921, lon: 36.8219, tz: "Africa/Nairobi" },
  { name: "Antananarivo", lat: -18.8792, lon: 47.5079, tz: "Indian/Antananarivo" },
  { name: "Tunis", lat: 36.8065, lon: 10.1815, tz: "Africa/Tunis" },
  { name: "Pékin", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" },
  { name: "Delhi", lat: 28.6139, lon: 77.2090, tz: "Asia/Kolkata" },
  { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, tz: "Asia/Kuala_Lumpur" }, // Malaisie
];

interface DayForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

interface CityData {
  name: string;
  currentTemp: number;
  forecast: DayForecast[];
}

export default function MeteoPage() {
  const [data, setData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      CITIES.map((city) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(city.tz)}&forecast_days=4`
        )
          .then((res) => res.json())
          .then((resData) => ({
            name: city.name,
            currentTemp: Math.round(resData.current_weather.temperature),
            forecast: resData.daily.time.map((date: string, i: number) => ({
              date,
              tempMax: Math.round(resData.daily.temperature_2m_max[i]),
              tempMin: Math.round(resData.daily.temperature_2m_min[i]),
              weatherCode: resData.daily.weather_code[i],
            })),
          }))
      )
    )
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="wrap" style={{ padding: "40px 20px", minHeight: "60vh", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Fil d'Ariane */}
        <div style={{ fontSize: "14px", marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "underline" }}>Accueil</Link> &gt; <span>Météo</span>
        </div>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", marginBottom: "10px", borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>
          La météo dans le monde
        </h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px", color: "var(--mute)", marginBottom: "40px" }}>
          Suivez les prévisions aux Comores, en Afrique et dans le monde.
        </p>

        {loading ? (
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "18px" }}>Chargement des données météo...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {data.map((city) => (
              <div key={city.name} style={{ border: "1px solid var(--rule)", borderRadius: "8px", backgroundColor: "var(--paper)", padding: "20px" }}>
                <h2 style={{ fontSize: "18px", fontFamily: "'Playfair Display', serif", color: "var(--green)", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
                  {city.name}
                </h2>
                
                {/* Température actuelle */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <span style={{ fontSize: "42px", fontWeight: "bold", color: "var(--ink)" }}>{city.currentTemp}°C</span>
                  <p style={{ fontSize: "13px", color: "var(--mute)", margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>En ce moment</p>
                </div>

                {/* Prévisions sur 3 jours */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid var(--rule)", paddingTop: "15px" }}>
                  {city.forecast.slice(1, 4).map((day, i) => {
                    const dateObj = new Date(day.date);
                    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
                    const dayName = dayNames[dateObj.getDay()];
                    
                    return (
                      <div key={day.date} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontFamily: "'Source Sans 3', sans-serif" }}>
                        <span style={{ fontWeight: "bold" }}>{i === 0 ? "Demain" : dayName}</span>
                        <span style={{ color: "var(--mute)" }}>{day.tempMin}° / {day.tempMax}°</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}