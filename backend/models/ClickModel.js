import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
});

export default mongoose.model("Click", ClickSchema);
