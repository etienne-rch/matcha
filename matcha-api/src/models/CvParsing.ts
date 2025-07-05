import { Schema, Types, model } from 'mongoose';

const CvParsingSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    rawText: {
      type: String,
      required: true,
    },

    modelUsed: {
      type: String,
      trim: true,
      default: 'undefined',
    },

    consentGiven: {
      type: Boolean,
      required: true,
      default: false,
    },

    extractedSkills: {
      type: [String],
      default: [],
    },

    extractedExperiences: {
      type: [String],
      default: [],
    },

    extractedEducations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default model('CvParsing', CvParsingSchema);
