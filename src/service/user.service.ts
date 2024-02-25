import UserModel, { UserDocument } from "../models/user.model";
import { User } from "../interfaces/user.interfafce";

export async function registerUser(userPayload: User): Promise<User> {
  try {
    const emailExists: User | null = await UserModel.findOne({
      email: userPayload.email,
    });

    if (emailExists) {
      throw new Error(`Email already exists`);
    }

    const user = await UserModel.create(userPayload);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function loginUser(userPayload: User): Promise<User> {
  try {
    const findUser: UserDocument | null = await UserModel.findOne({
      email: userPayload.email,
    });

    if (!findUser) {
      throw new Error(`Invalid email or password`);
    }

    const isPasswordMatching: boolean = await findUser.comparePassword(
      userPayload.password,
      findUser.password
    );

    if (!isPasswordMatching) {
      throw new Error(`Invalid email or password`);
    }

    findUser.password = "";
    return findUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
