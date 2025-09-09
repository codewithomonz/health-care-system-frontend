import { z } from "zod";

export const loginSchema = z.object({
  hostpitalId: z.string().min(2, {
    message: "hostpitalId must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least6 characters.",
  }),
});
