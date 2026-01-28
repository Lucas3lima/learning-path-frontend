// src/pages/_app/layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthProvider } from '@/contexts/auth-context'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { Header } from '@/components/layout/Header'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // Primeiro provemos o contexto de autenticação
    <AuthProvider>
      {/* Depois protegemos todas as rotas filhas */}
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    </AuthProvider>
  )
}

// Layout interno, onde o useAuth já funciona
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Outlet /> {/* Todas as páginas filhas do _app vão renderizar aqui */}
    </div>
  )
}
