import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv'
const app = express();
import axios from "axios";
import connectDB from "./db.js";
import {CryptoData} from "./CryptoData.js";
import cors from 'cors'

dotenv.config()

connectDB()
app.use(cors())

app.get('/api/top-10', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const top10 = Object.values(response.data).slice(0, 10);

        await CryptoData.deleteMany();  // Clear old data

        const insertPromises = top10.map(item => {
            const { name, last, buy, sell, volume } = item;

            // Ensure that buy and sell are valid numbers
            const buyPrice = parseFloat(buy);
            const sellPrice = parseFloat(sell);

            let difference = 0;
            let savings = 0;

            // Calculate difference and savings only if sellPrice is valid and not zero
            if (!isNaN(buyPrice) && !isNaN(sellPrice) && sellPrice !== 0) {
                difference = ((buyPrice - sellPrice) / sellPrice) * 100;  // Calculate difference
                savings = volume * difference;  // Calculate savings
            }

            // Create a new instance of CryptoData
            const cryptoData = new CryptoData({
                platform: name,
                last_traded_price: last,
                buy_price: buyPrice,
                sell_price: sellPrice,
                difference: difference,
                savings: savings,
            });

            return cryptoData.save(); // Return the promise from save()
        });

        await Promise.all(insertPromises); // Wait for all inserts to complete

        res.json(top10); // Send the top 10 data back in response
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('Error fetching data');
    }
});

// app.get('/api/top-10', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
//         const top10 = Object.values(response.data).slice(0, 10);
        
//         await CryptoData.query('DELETE FROM tickers'); // Clear old data
//         top10.forEach(async item => {
//             const { name, last, buy, sell, volume, base_unit } = item;
//             await CryptoData.query('INSERT INTO tickers(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)',
//                 [name, last, buy, sell, volume, base_unit]);
//         });

//         res.json(top10);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching data');
//     }
// });

// app.get('/api/crypto', async (req, res) => {
//     try {
//         const data = await CryptoData.find().sort({ created_at: -1 }).limit(10);
//         res.json(data);
//     } catch (error) {
//         console.error("Error retrieving data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at PORT: ${process.env.PORT}`)
})
