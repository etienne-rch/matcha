import { Schema, model, Types } from "mongoose";

const SkillsAssessmentSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    skills: [String],
    aspirations: [String],
    logic: Number,
    memory: Number,
    attention: Number,
    creativity: Number,
    createdAt: Date,
    updatedAt: Date,
  });
  
export default model("SkillsAssessment", SkillsAssessmentSchema);