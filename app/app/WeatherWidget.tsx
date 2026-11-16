"use client";

import { useEffect, useState } from "react";

interface DayForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

interface CityWeather {
  name: string;
  forecast: DayForecast[];
}

const WEATHER_ICONS: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌦️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "🌨️",
  80: "🌦️", 81: "🌦️", 82: "🌧️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const CITIES = [
  { name: "Moroni", lat: -11.7042, lon: 43.2402, tz: "Indian/Comoro" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
];

export default function WeatherWidget() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      CITIES.map((city) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(
            city.tz
          )}&forecast_days=3`
        )
          .then((res) => res.json())
          .then((data) => ({
            name: city.name,
            forecast: data.daily.time.map((date: string, i: number) => ({
              date,
              tempMax: Math.round(data.daily.temperature_2m_max[i]),
              tempMin: Math.round(data.daily.temperature_2m_min[i]),
              weatherCode: data.daily.weather_code[i],
            })),
          }))
      )
    )
      .then((results) => {
        setCities(results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "4px",
      }}
    >
      <h4
        style={{
          fontSize: "18px",
          fontFamily: "Playfair Display, serif",
          color: "#0f3d2e",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Météo
      </h4>

      {loading ? (
        <p style={{ fontSize: "13px", color: "#5b5f66", textAlign: "center" }}>
          Chargement…
        </p>
      ) : (
        <div style={{ display: "flex", gap: "16px" }}>
          {cities.map((city) => (
            <div key={city.name} style={{ flex: 1 }}>
              <h5
                style={{
                  fontSize: "14px",
                  fontFamily: "Playfair Display, serif",
                  color: "#0f3d2e",
                  textAlign: "center",
                  marginBottom: "10px",
                  fontWeight: 700,
                }}
              >
                {city.name}
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {city.forecast.map((day, i) => {
                  const d = new Date(day.date);
                  const label = i === 0 ? "Auj." : DAYS_FR[d.getDay()];
                  return (
                    <div
                      key={day.date}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: "12px",
                        fontFamily: "Source Sans 3, sans-serif",
                        color: "#1a202c",
                        padding: "6px 0",
                        borderBottom:
                          i < city.forecast.length - 1
                            ? "1px solid #e5e7eb"
                            : "none",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: "20px", lineHeight: 1.2 }}>
                        {WEATHER_ICONS[day.weatherCode] ?? "🌡️"}
                      </span>
                      <span style={{ color: "#5b5f66" }}>
                        {day.tempMin}° / <strong>{day.tempMax}°</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}