import { Schema, model, Types } from "mongoose";

const LogFeedbackSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    type: String,
    content: String,
    createdAt: Date,
  });
  
  export default model("LogFeedback", LogFeedbackSchema);