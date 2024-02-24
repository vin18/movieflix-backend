import { FilterQuery, SchemaDefinitionProperty } from "mongoose";
import { omit } from "lodash";

import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: SchemaDefinitionProperty<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) return false;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
