import mongoose from 'mongoose';

// PrayerTime schema definition
const prayerTimeSchema = new mongoose.Schema({
    city: { type: String, required: true },
    fajr: { type: String, required: true },
    shurooq: { type: String, required: true },
    dhuhr: { type: String, required: true },
    asr: { type: String, required: true },
    maghrib: { type: String, required: true },
    isha: { type: String, required: true },
    date: { type: Date, default: Date.now },
    country: { type: String },
    timezone: { type: String },
});

const PrayerTime = mongoose.model('PrayerTime', prayerTimeSchema);
export default PrayerTime;