import { Schema, Types, model } from 'mongoose';

const TrainingSchema = new Schema(
  {
    externalId: { type: String, trim: true },
    source: { type: String, trim: true }, // ex: "OpenClassrooms", "MonCompteFormation"

    isActive: { type: Boolean, default: true },
    lastSyncedAt: Date,

    title: { type: String, required: true, trim: true },
    provider: { type: String, trim: true },
    link: { type: String, trim: true },

    cost: { type: Number, min: 0 },
    cpfEligible: { type: Boolean, default: false },

    relatedJobIds: [{ type: Types.ObjectId, ref: 'Job' }],

    durationWeeks: { type: Number, min: 0 },

    modality: {
      type: String,
      enum: ['online', 'in-person', 'hybrid'],
      default: 'online',
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
    timestamps: true, // auto add createdAt / updatedAt
  },
);

TrainingSchema.index({ location: '2dsphere' });

export default model('Training', TrainingSchema);
