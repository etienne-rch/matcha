import { Schema, Types, model } from 'mongoose';

const AnswerSchema = new Schema(
  {
    questionId: { type: String, required: true },
    value: { type: Number, required: true }, // -2 .. +2 (Likert)
  },
  { _id: false },
);

const PersonalityTestSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // lien vers le template (questions/profils) utilisé pour ce passage
    templateId: {
      type: Types.ObjectId,
      ref: 'PersonalityTemplate',
      required: true,
      index: true,
    },

    // version du template au moment du test (pour audit/repro)
    templateVersion: { type: String, required: true },

    // réponses brutes
    answers: {
      type: [AnswerSchema],
      default: [],
      validate: [
        (arr: any[]) => Array.isArray(arr),
        'answers must be an array',
      ],
    },

    // résultat calculé
    type: { type: String, required: true, trim: true }, // e.g. ENTP
    result: { type: String, required: true, trim: true }, // e.g. "Innovateur" (label)
    description: { type: String },
    traits: { type: [String], default: [] }, // forces synthétiques
    weaknesses: { type: [String], default: [] },
    motivationProfile: { type: [String], default: [] }, // jobs suggérés

    // détails du scoring pour transparence & debug
    scoreBreakdown: {
      type: Map,
      of: Number, // { EI: 3, SN: -1, TF: 2, JP: -2 }
      default: {},
    },
  },
  { timestamps: true },
);

// éviter les doublons (un résultat par user et template actif, optionnel)
PersonalityTestSchema.index({ userId: 1, templateId: 1 }, { unique: true });

export default model('PersonalityTest', PersonalityTestSchema);
