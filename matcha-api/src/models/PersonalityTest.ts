import { Schema, Types, model } from 'mongoose';

const PersonalityTestSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    result: {
      type: String,
      required: true,
      trim: true,
    },

    traits: {
      type: [String],
      default: [],
    },

    motivationProfile: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // auto-add createdAt / updatedAt
  },
);

export default model('PersonalityTest', PersonalityTestSchema);
