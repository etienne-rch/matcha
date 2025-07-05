import { Schema, Types, model } from 'mongoose';

const ChatSessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    endedAt: Date,

    messages: [
      {
        sender: {
          type: String,
          enum: ['user', 'system', 'assistant'],
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model('ChatSession', ChatSessionSchema);
