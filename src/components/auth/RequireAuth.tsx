import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import { Navigate } from '@tanstack/react-router'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return <>{children}</>
}
