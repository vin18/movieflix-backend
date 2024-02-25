import { TypeOf, object, string } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, `Password too short - should be atleast 8 characters`),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, `Password too short - should be atleast 8 characters`),
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
