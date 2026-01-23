// src/pages/_app/index.tsx
import { useAuth } from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth() // ✅ agora funciona, porque está dentro do AuthProvider

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Bem-vindo, {user?.name ?? 'usuário'}!
      </h1>
      <p className="text-muted-foreground">
        Aqui você verá seus módulos, aulas e provas disponíveis.
      </p>

      {/* Exemplo de cards de módulos */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Módulo 01</h2>
          <p className="text-sm text-muted-foreground">3 aulas, 1 prova</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Módulo 02</h2>
          <p className="text-sm text-muted-foreground">2 aulas, 2 provas</p>
        </div>
      </div>
    </div>
  )
}
