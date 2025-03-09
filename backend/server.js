import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ClickModel from "./models/ClickModel.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


mongoose
    .connect(process.env.MONGO_URI, )
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.post("/click", async (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Address is required" });

    let user = await ClickModel.findOne({ address });

    if (!user) {
        user = new ClickModel({ address, clicks: 0 });
    }

    user.clicks += 1;
    await user.save();

    res.json({ address, clicks: user.clicks });
});

app.get("/clicks/:address", async (req, res) => {
    const { address } = req.params;
    const user = await ClickModel.findOne({ address });
    res.json({ address, clicks: user ? user.clicks : 0 });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
