import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import connectDB from "./db.js";
import CryptoData from "./CryptoData.js";

dotenv.config();

const app = express();
connectDB();

app.get('/api/top-10', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const top10 = Object.values(response.data).slice(0, 10);

        await CryptoData.deleteMany(); // Clear old data

        const insertPromises = top10.map(async item => {
            const { name, last, buy, sell, volume } = item;
            const cryptoData = new CryptoData({
                platform: name,
                last_traded_price: last,
                buy_price: buy,
                sell_price: sell,
                difference: ((buy - sell) / sell) * 100,
                savings: volume * (((buy - sell) / sell) * 100) // Example logic for savings
            });
            return cryptoData.save();
        });

        await Promise.all(insertPromises); // Wait for all inserts to complete
        res.json(top10);
    } catch (error) {
        console.error("Error fetching or storing data:", error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
});
