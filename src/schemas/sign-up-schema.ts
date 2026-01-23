import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),

    password: z
      .string()
      .min(4, 'Password must be at least 4 characters'),

    confirmPassword: z
      .string()
      .min(4, 'Confirm your password'),

    registrationNumber: z
      .string()
      .min(1, 'Registration number is required'),

    plantId: z
      .string()
      .min(1, 'Select a plant'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
