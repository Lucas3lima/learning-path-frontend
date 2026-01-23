import { z } from 'zod'

export const signInSchema = z
  .object({
      
    email: z
      .email()
      .min(1),
      
    password: z
      .string()
  })

export type SignInSchema = z.infer<typeof signInSchema>
