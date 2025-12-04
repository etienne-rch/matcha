import { Schema, model } from 'mongoose';

const OptionSchema = new Schema({
  value: { type: Number, required: true }, // -2 à +2
  label: { type: String, required: true },
});

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  dimension: {
    type: String,
    enum: ['EI', 'SN', 'TF', 'JP'],
    required: true,
  },
  options: { type: [OptionSchema], required: true },
});

const ProfileSchema = new Schema({
  key: String, // ENTP, ISFJ...
  label: String, // “Innovateur”, “Protecteur”
  description: String,
  strengths: [String],
  weaknesses: [String],
  recommendedJobs: [String],
});

const PersonalityTemplateSchema = new Schema({
  title: { type: String, default: 'Test de personnalité Matcha' },
  summary: { type: String },
  isActive: { type: Boolean, default: true },
  version: { type: String, default: '1.0' },
  profiles: [ProfileSchema],
  questions: [QuestionSchema],
});

export default model('PersonalityTemplate', PersonalityTemplateSchema);
