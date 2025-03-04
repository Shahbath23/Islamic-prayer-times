import React, { useState } from "react";
import axios from "axios";

export default function LocationForm({ onSubmit }) {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:3070/api/prayertimes/location", {
                params: { city: city.trim() },
            });

            if (response.data.timings) {
                onSubmit(response.data.timings, response.data.city);
            } else {
                setError("No prayer times available for this city.");
            }
        } catch (err) {
            setError(`Failed to fetch prayer times. ${err.response?.data?.error || err.message}`);
            console.error("Error fetching prayer times:", err.response || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Enter Location</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ margin: "5px", padding: "8px", width: "200px" }}
                    required
                />
                <button type="submit" style={{ padding: "8px 16px", marginLeft: "10px" }}>
                    {loading ? "Loading..." : "Get Prayer Times"}
                </button>
            </form>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
}