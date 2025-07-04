import { Schema, model, Types } from "mongoose";

const JobSchema = new Schema({
  externalId: String,
  source: String,
  isActive: Boolean,
  lastSyncedAt: Date,
  title: String,
  description: String,
  requiredSkills: [String],
  sector: String,
  salaryMin: Number,
  salaryMax: Number,
  growthOutlook: String,
  tags: [String],
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  addressCity: String,
  addressPostalCode: String,
  addressCountry: String,
  createdAt: Date,
  updatedAt: Date,
});

export default model("Job", JobSchema);
