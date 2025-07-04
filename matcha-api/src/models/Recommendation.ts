import { Schema, model, Types } from "mongoose";

const RecommendationSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    suggestedJobs: [{ type: Types.ObjectId, ref: "Job" }],
    suggestedTrainings: [{ type: Types.ObjectId, ref: "Training" }],
    explanation: String,
    modelVersion: String,
    createdAt: Date,
    updatedAt: Date,
  });
  
  export default model("Recommendation", RecommendationSchema);