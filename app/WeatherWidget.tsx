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
    <section className="ar-block ar-wx">
      <h2 className="ar-block-title">Météo</h2>

      {loading ? (
        <p className="ar-block-text">Chargement…</p>
      ) : cities.length === 0 ? (
        <p className="ar-block-text">Météo indisponible pour le moment.</p>
      ) : (
        <div className="ar-wx-cols">
          {cities.map((city) => (
            <div key={city.name} className="ar-wx-city">
              <h3>{city.name}</h3>
              <ul>
                {city.forecast.map((day, i) => {
                  // midi pour éviter tout décalage de jour lié au fuseau horaire
                  const d = new Date(`${day.date}T12:00:00`);
                  const label = i === 0 ? "Auj." : DAYS_FR[d.getDay()];
                  return (
                    <li key={day.date}>
                      <span className="ar-wx-day">{label}</span>
                      <span className="ar-wx-ico" aria-hidden>
                        {WEATHER_ICONS[day.weatherCode] ?? "🌡️"}
                      </span>
                      <span className="ar-wx-t">
                        {day.tempMin}° / <strong>{day.tempMax}°</strong>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
