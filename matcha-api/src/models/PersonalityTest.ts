import { Schema, model, Types } from "mongoose";

const PersonalityTestSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    type: String,
    result: String,
    traits: [String],
    motivationProfile: [String],
    createdAt: Date,
    updatedAt: Date,
  });

export default model("PersonalityTest", PersonalityTestSchema);