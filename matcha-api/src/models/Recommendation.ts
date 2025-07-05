import { Schema, Types, model } from 'mongoose';

const RecommendationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    suggestedJobs: [
      {
        type: Types.ObjectId,
        ref: 'Job',
        default: [],
      },
    ],

    suggestedTrainings: [
      {
        type: Types.ObjectId,
        ref: 'Training',
        default: [],
      },
    ],

    explanation: {
      type: String,
      trim: true,
    },

    modelVersion: {
      type: String,
      trim: true,
      default: 'v1',
    },
  },
  {
    timestamps: true, // createdAt / updatedAt auto
  },
);

export default model('Recommendation', RecommendationSchema);
