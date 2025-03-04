import axios from 'axios';
import PrayerTime from '../model/prayerTimeModel.js';

const prayerCLtr = {};

// Fetch prayer times by city
prayerCLtr.loc = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const apiKey = process.env.API_KEY;
    const apiUrl = `http://muslimsalat.com/${city}/daily.json?key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        if (response.data.status_code !== 1 || !response.data.items || !response.data.items[0]) {
            console.error("Invalid response from MuslimSalat API:", response.data);
            return res.status(400).json({ error: 'Unable to fetch prayer times. Invalid response from API.' });
        }

        const timings = response.data.items[0];
        const { fajr, shurooq, dhuhr, asr, maghrib, isha } = timings;

        res.status(200).json({
            city: response.data.city || city,
            timings: { fajr, shurooq, dhuhr, asr, maghrib, isha },
        });
    } catch (error) {
        console.error('Error fetching prayer times:', error.message);
        res.status(500).json({
            error: 'Internal server error. Unable to fetch prayer times.',
            details: error.message,
        });
    }
};

// Fetch prayer times by coordinates
prayerCLtr.locByCoords = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const apiUrl = `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

    try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        if (response.data.code !== 200 || !response.data.data || !response.data.data.timings) {
            console.error("Invalid response from Aladhan API:", response.data);
            return res.status(400).json({ error: 'Unable to fetch prayer times. Invalid response from API.' });
        }

        res.json({
            latitude,
            longitude,
            timings: response.data.data.timings,
        });
    } catch (error) {
        console.error('Error fetching prayer times:', error.message);
        res.status(500).json({
            error: 'Internal server error. Unable to fetch prayer times.',
            details: error.message,
        });
    }
};

export default prayerCLtr;