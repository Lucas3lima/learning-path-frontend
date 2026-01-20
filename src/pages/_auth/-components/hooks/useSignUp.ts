import { signUp } from "@/services/auth/sign-up"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"


export function useSignUp() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signUp,

    onSuccess: (data) => {
      navigate({ to: '/sign-in' })
    }

  })
}