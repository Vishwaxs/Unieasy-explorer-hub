import { z } from "zod";

export const signupStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signupStep2Schema = z.object({
  university: z
    .string()
    .min(2, "University name is required")
    .max(100, "University name must be less than 100 characters"),
  course: z
    .string()
    .min(2, "Course name is required")
    .max(100, "Course name must be less than 100 characters"),
  year: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select your year",
  }),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  city: z
    .string()
    .min(2, "City name is required")
    .max(50, "City name must be less than 50 characters"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignupStep1Data = z.infer<typeof signupStep1Schema>;
export type SignupStep2Data = z.infer<typeof signupStep2Schema>;
