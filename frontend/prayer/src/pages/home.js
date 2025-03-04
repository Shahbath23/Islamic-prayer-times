import React, { useState } from "react";
import LocationForm from "../components/locationForm";
import PrayerTimes from "../components/prayerTimes";

export default function Home() {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [city, setCity] = useState("");

    const handlePrayerTimesSubmit = (times, city) => {
        setPrayerTimes(times);
        setCity(city);
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="display-5 fw-bold text-success mb-4">
                    <i className="bi bi-moon-stars-fill"></i> Islamic Prayer Times
                </h1>
                <p className="lead text-secondary">Find accurate prayer times for any location</p>
                <LocationForm onSubmit={handlePrayerTimesSubmit} />
                {prayerTimes ? (
                    <PrayerTimes prayerTimes={prayerTimes} city={city} />
                ) : (
                    <p className="mt-3 text-muted fs-5">
                        Please enter a location to view prayer times.
                    </p>
                )}
            </div>
        </div>
    );
}
