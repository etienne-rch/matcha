import { Schema, Types, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },

    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    birthYear: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'undisclosed'],
    },
    subscription: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },

    jobTypes: [{ type: String, trim: true }],
    locationPref: { type: String, enum: ['remote', 'hybrid', 'on-site'] },
    remote: Boolean,

    avatarUrl: String,
    avatarPublicId: String,
    avatarUploadedAt: Date,

    consentAccepted: { type: Boolean, required: true },
    consentTimestamp: Date,

    personalityTestId: { type: Types.ObjectId, ref: 'PersonalityTest' },
    skillsAssessmentId: { type: Types.ObjectId, ref: 'SkillsAssessment' },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
        required: true,
      },
    },

    addressStreet: String,
    addressCity: String,
    addressPostalCode: String,
    addressCountry: String,

    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,

    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    resetPasswordTokenUsed: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  },
);

UserSchema.index({ location: '2dsphere' });

export default model('User', UserSchema);
