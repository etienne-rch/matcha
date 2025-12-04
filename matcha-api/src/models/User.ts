import { Schema, Types, model } from 'mongoose';

const UserSchema = new Schema(
  {
    // Identité
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    pendingEmail: { type: String, default: undefined },

    passwordHash: {
      type: String,
      required: true,
    },

    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    // Données personnelles
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

    // Emploi & localisation
    jobTypes: [{ type: String, trim: true }],
    locationPref: { type: String, enum: ['remote', 'hybrid', 'on-site'] },
    remote: Boolean,

    avatarUrl: String,
    avatarPublicId: String,
    avatarUploadedAt: Date,

    // Consentement RGPD
    consentAccepted: { type: Boolean, required: true },
    consentTimestamp: Date,

    // Relations
    personalityTestId: { type: Types.ObjectId, ref: 'PersonalityTest' },
    skillsAssessmentId: { type: Types.ObjectId, ref: 'SkillsAssessment' },

    // Géolocalisation
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true,
      },
    },

    addressStreet: String,
    addressCity: String,
    addressPostalCode: String,
    addressCountry: String,

    // Vérification d’email
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,

    resetPasswordTokenHash: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true, // Ajoute createdAt / updatedAt
  },
);

// Index géospatial
UserSchema.index({ location: '2dsphere' });

UserSchema.pre('save', function (next) {
  if (this.isModified('consentAccepted')) {
    this.consentTimestamp = new Date();
  }
  next();
});

export default model('User', UserSchema);
