import { Schema, Types, model } from "mongoose";

/**
 * User model based on the USERS structure from your schema (MongoDB style).
 * Each field directly corresponds to a column in the diagram.
 */
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: { type: String, required: false },

    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    birthYear: { type: Number },

    gender: {
      type: String,
      enum: ["male", "female", "other", "undisclosed"],
    },

    subscription: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    jobTypes: [{ type: String, trim: true }],

    locationPref: {
      type: String,
      enum: ["remote", "hybrid", "on-site"],
    },

    remote: { type: Boolean },

    avatarUrl: { type: String },
    avatarPublicId: { type: String },
    avatarUploadedAt: { type: Date },

    consentAccepted: { type: Boolean, required: true },
    consentTimestamp: { type: Date },

    personalityTestId: { type: Types.ObjectId, ref: "PersonalityTest" },
    skillsAssessmentId: { type: Types.ObjectId, ref: "SkillsAssessment" },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
        required: true,
      },
    },

    addressStreet: { type: String },
    addressCity: { type: String },
    addressPostalCode: { type: String },
    addressCountry: { type: String },

    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date
  },
  {
    timestamps: true, // Automatically adds createdAt / updatedAt
  }
);

// Geospatial index for location-based search
UserSchema.index({ location: "2dsphere" });

export default model("User", UserSchema);
