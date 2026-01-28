import { getProfile } from '@/services/app/get-profile'
import { logout } from '@/services/auth/logout'
import { useNavigate } from '@tanstack/react-router'
import { createContext, useEffect, useState } from 'react'


type User = {
  id: string
  name: string | null
  email: string
  registration_number: string
  role: 'user' | 'manager'
  plantRole: 'student' | 'manager'
  plantId: string
  plantName: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  async function loadUser() {
    try {
      const { user } = await getProfile()
      setUser(user)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    try {
      await logout()
    } catch (err) {
      console.error('Erro ao deslogar:', err)
    } finally {
      setUser(null)
      navigate({ to: '/sign-in', replace: true })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
