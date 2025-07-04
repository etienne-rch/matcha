import { Schema, model, Types } from "mongoose";

const CvParsingSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    fileUrl: String,
    rawText: String,
    modelUsed: String,
    consentGiven: Boolean,
    extractedSkills: [String],
    extractedExperiences: [String],
    extractedEducations: [String],
    createdAt: Date,
    updatedAt: Date,
  });
  
export default model("CvParsing", CvParsingSchema);