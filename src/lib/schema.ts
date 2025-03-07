import { z } from "zod"

export const signupFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name not valid"
  }).max(50),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(10, {
    message: "Enter a valid phone number"
  }).max(15),
  password: z.string().min(6, {
    message:"Password must contain at least 6 characters"
  }).max(50),
  confirmPassword: z.string().min(1, {
    message:"Re-enter password"
  }),
}).superRefine(({password, confirmPassword}, ctx)=>{
  if(confirmPassword !== password){
    ctx.addIssue({
      code:"custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

export const loginFormSchema = z.object({
  loginEmail: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export const shopFormSchema = z.object({
    name: z.string().min(1, {
      message:"Business name is required",
    }).max(250),
    type:z.string().min(1, {
      message: "Select a business type."
    }),
    description: z.string().optional(),
    address: z.string().optional(),
    imageUrl: z.string().optional(),
    website: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
});
