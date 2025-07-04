import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  firstName: String,
  lastName: String,
  birthYear: Number,
  gender: String,
  subscription: String,
  jobTypes: [String],
  locationPref: String,
  remote: Boolean,
  avatarUrl: String,
  avatarPublicId: String,
  avatarUploadedAt: Date,
  consentAccepted: Boolean,
  consentTimestamp: Date,
  personalityTestId: { type: Types.ObjectId, ref: "PersonalityTest" },
  skillsAssessmentId: { type: Types.ObjectId, ref: "SkillsAssessment" },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  addressStreet: String,
  addressCity: String,
  addressPostalCode: String,
  addressCountry: String,
  createdAt: Date,
  updatedAt: Date,
});

export default model("User", UserSchema);