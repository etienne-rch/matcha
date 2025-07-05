import { Schema, Types, model } from 'mongoose';

const SkillsAssessmentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    aspirations: {
      type: [String],
      default: [],
    },

    logic: {
      type: Number,
      min: 0,
      max: 100,
    },

    memory: {
      type: Number,
      min: 0,
      max: 100,
    },

    attention: {
      type: Number,
      min: 0,
      max: 100,
    },

    creativity: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true, // auto-add createdAt and updatedAt
  },
);

export default model('SkillsAssessment', SkillsAssessmentSchema);
