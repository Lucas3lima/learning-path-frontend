import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/services/auth/sign-in"


export function useSignIn() {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: signIn,
  })
}