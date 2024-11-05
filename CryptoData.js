import mongoose from "mongoose";

const cryptoDataSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    last_traded_price: { type: Number, required: true },
    buy_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    difference: { type: Number, required: true },
    savings: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Optional: Add indexes if necessary
cryptoDataSchema.index({ platform: 1 });
cryptoDataSchema.index({ created_at: -1 });

export const CryptoData =  mongoose.model('CryptoData', cryptoDataSchema);
