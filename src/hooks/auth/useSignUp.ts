import { signUp } from "@/services/auth/sign-up"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"


export function useSignUp() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signUp,

    onSuccess: () => {
      toast.success('Account created successfully',{ position: "top-center" })
      navigate({ to: '/sign-in' })
    }

  })
}