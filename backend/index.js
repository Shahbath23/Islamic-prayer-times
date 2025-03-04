import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prayerCLtr from "./controller/prayerTimeCltr.js";

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

dotenv.config();
connectDB();

app.get('/api/prayertimes/location', prayerCLtr.loc);
app.get('/api/prayertimes/coords', prayerCLtr.locByCoords);

app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});