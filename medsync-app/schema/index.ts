import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email is invalid',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  hospitalId: z
    .string()
    .refine((id) => id === '111111', {
      message: 'Hospital id is invalid',
    })
    .optional(),
});

export const signUpSchema = z.object({
  name: z.string().min(3, {
    message: 'Username must be at least 3 characters long',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  email: z.string().email({
    message: 'Email is invalid',
  }),
  dateOfBirth: z.coerce.date({
    required_error: 'Your date of birth is required',
  }),
  hospitalId: z
    .string()
    .refine((id) => id === '111111', {
      message: 'Hospital id is invalid',
    })
    .optional(),
});
