import { getProfile } from '@/services/app/get-profile'
import { createContext, useEffect, useState } from 'react'


type User = {
  id: string
  name: string | null
  email: string
  registration_number: string
  role: 'user' | 'manager'
  plantRole: 'student' | 'manager'
  plantId: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  function signOut() {
    setUser(null)
    window.location.href = '/sign-in'
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
