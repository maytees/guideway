import z from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z.object({
    email: z.string().email({ message: "Please use a valid email address" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" })
        .refine(s => !s.includes(" "), "Username cannot contain spaces"),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
});

export const passwordResetSchema = z.object({
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
}).superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
})

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please use a valid email address" }),
})

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
export type IPasswordReset = z.infer<typeof passwordResetSchema>;
export type IForgotPassword = z.infer<typeof forgotPasswordSchema>;