import React from "react";

export default function PrayerTimes({ prayerTimes, city }) {
    if (!prayerTimes || Object.keys(prayerTimes).length === 0) {
        return (
            <div style={{ marginTop: "20px", color: "red" }}>
                <p>No prayer times available.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Prayer Times for {city}</h2>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {Object.entries(prayerTimes).map(([time, value]) => (
                    <li key={time} style={{ marginBottom: "5px" }}>
                        <strong>{time}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
