import { ClubCategory } from "@prisma/client";
import z from "zod";

// Auth
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please use a valid email address" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please use a valid email address" }),
});

export const goolgeNameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .refine((s) => !s.includes(" "), "Username cannot contain spaces")
    .refine(
      (s) => s.length < 31,
      "Username must be less than 31 characters long",
    )
    .refine(
      (s) => /^[a-zA-Z0-9_-]+$/.test(s),
      "Username can only contain letters, numbers, dashes and underscores",
    ),
});

// Dashboard
export const joinGroupSchema = z.object({
  joinCode: z.string().min(8, { message: "Join code invalid!" }),
});

// TODO: Add logo
export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Group name must be at least 3 characters long" })
    .max(32, { message: "Group name length musn't exceed 32 characters" }),
  description: z
    .string()
    .min(1, { message: "Group description must be at least 1 character long" })
    .max(256, {
      message: "Group description length musn't exceed 256 characters",
    }),
  category: z.enum(Object.values(ClubCategory) as [string, ...string[]], {
    required_error: "Please select a valid club category",
    invalid_type_error: "Please select a club category",
  }),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isPinned: z.boolean().default(false),
});

// Dashboard interfaces
export type IJoinGroupCode = z.infer<typeof joinGroupSchema>;
export type ICreateGroup = z.infer<typeof createGroupSchema>;
export type IPost = z.infer<typeof postSchema>;

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
export type IPasswordReset = z.infer<typeof passwordResetSchema>;
export type IForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type IGoogleName = z.infer<typeof goolgeNameSchema>;

// Email Updates
export const updatesSignupSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please use a valid email address" }),
});

export type IUpdatesSignup = z.infer<typeof updatesSignupSchema>;
