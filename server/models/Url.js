import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: String,
      default: null,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;