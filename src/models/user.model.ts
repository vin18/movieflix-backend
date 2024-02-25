import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(
    candidatePassword: string | undefined,
    actualPassword: string
  ): Promise<boolean>;
  createJWT(): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string | undefined
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword ?? "", user.password)
    .catch((e) => false);
};

userSchema.methods.createJWT = function () {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const jwtExpiry = process.env.JWT_EXPIRY ?? "1d";

  return jwt.sign({ userId: this._id }, jwtSecret, {
    expiresIn: jwtExpiry,
  });
};

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
