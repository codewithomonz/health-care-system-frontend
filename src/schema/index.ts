import { z } from "zod";

export const loginSchema = z.object({
  hostpitalId: z.string().min(2, {
    message: "hostpitalId must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least6 characters.",
  }),
});

export const registerSchema = z
  .object({
    hostpitalId: z.string().min(2, {
      message: "Hospital ID must be at least 2 characters.",
    }),
    name: z.string().min(4, {
      message: "Fullname must be at least 4 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
