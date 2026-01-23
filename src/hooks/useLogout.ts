import { logout } from '@/services/auth/logout'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function useLogout() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate({ to: '/sign-in', replace: true })
    },
  })
}
