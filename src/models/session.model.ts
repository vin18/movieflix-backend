import { Document, Schema, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
  userAgent: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const SessionModel = model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
