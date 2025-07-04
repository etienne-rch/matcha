import { Schema, model, Types } from "mongoose";

const TrainingSchema = new Schema({
    externalId: String,
    source: String,
    isActive: Boolean,
    lastSyncedAt: Date,
    title: String,
    provider: String,
    link: String,
    cost: Number,
    cpfEligible: Boolean,
    relatedJobIds: [{ type: Types.ObjectId, ref: "Job" }],
    durationWeeks: Number,
    modality: String,
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
  
  export default model("Training", TrainingSchema);