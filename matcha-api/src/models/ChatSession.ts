import { Schema, model, Types } from "mongoose";

const ChatSessionSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    startedAt: Date,
    endedAt: Date,
    messages: [String],
  });
  
  export default model("ChatSession", ChatSessionSchema);