import mongoose from "mongoose";

const BackgroundSchema = new mongoose.Schema(
  {
    url: { type: String, required: false, default: "" },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Background", BackgroundSchema);