import axios from "axios";

// Fetch prayer times by coordinates
export const getPrayerTimesByCoords = async (latitude, longitude) => {
    try {
        // Send request to get prayer times by coordinates
        const response = await axios.get("http://localhost:3070/api/prayertimes/coords", {
            params: { latitude, longitude },
        });

        // Log the full API response (for debugging)
        console.log("Full API Response (Coordinates):", response.data);

        // Check for valid data in the response
        if (response.status === 200 && response.data?.timings) {
            return response.data.timings;  // Return timings if found
        } else {
            throw new Error("Prayer times not found or invalid response format.");
        }
    } catch (error) {
        console.error("Error fetching prayer times by coordinates:", error.message);
        throw new Error("Unable to fetch prayer times by coordinates. Please try again.");
    }
};

// Fetch prayer times by city
export const getPrayerTimesByLocation = async (city) => {
    try {
        // Send request to get prayer times by city
        const response = await axios.get("http://localhost:3070/api/prayertimes/location", {
            params: { city },
        });

        // Log the full API response (for debugging)
        console.log("Full API Response (Location):", response.data);

        // Check for valid data in the response
        if (response.status === 200 && response.data?.timings) {
            return response.data.timings;  // Return timings if found
        } else {
            throw new Error("Prayer times not found or invalid response format.");
        }
    } catch (error) {
        console.error("Error fetching prayer times by location:", error.message);
        throw new Error("Unable to fetch prayer times by location. Please try again.");
    }
};
