import { Schema, model } from 'mongoose';

const JobSchema = new Schema(
  {
    externalId: { type: String, trim: true },
    source: { type: String, trim: true }, // ex: "France Travail", "LinkedIn", etc.

    isActive: { type: Boolean, default: true },
    lastSyncedAt: Date,

    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    requiredSkills: {
      type: [String],
      default: [],
    },

    sector: {
      type: String,
      trim: true,
    },

    salaryMin: {
      type: Number,
      min: 0,
    },
    salaryMax: {
      type: Number,
      min: 0,
    },

    growthOutlook: {
      type: String,
      enum: ['stable', 'growing', 'declining', 'unknown'],
      default: 'unknown',
    },

    tags: {
      type: [String],
      default: [],
    },

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

    addressCity: { type: String, trim: true },
    addressPostalCode: { type: String, trim: true },
    addressCountry: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

JobSchema.index({ location: '2dsphere' });

export default model('Job', JobSchema);
