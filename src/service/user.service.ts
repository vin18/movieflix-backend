import { SchemaDefinitionProperty } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: SchemaDefinitionProperty<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
