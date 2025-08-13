// models/Category.js
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Category", categorySchema);
