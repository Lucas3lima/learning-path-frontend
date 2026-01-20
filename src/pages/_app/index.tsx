import { api } from '@/services/http-cliente'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})
type Plant = {
  id: string
  name: string
  role: string
}

type SignInSuccessResponse = {
  token: string
  requiresPlantSelection?: boolean
  plants?: Plant[]
}
type ApiErrorResponse = {
  message: string
}


const getUser = async () => {
  const response = await api.get("users")
  return await response.json()
}
const signIn = async () => {
  try {
    return await api
      .post('sessions/password', {
        json: {
          email: 'lucas.lima@metalsa.com',
          password: '2469s',
        },
      })
      .json<SignInSuccessResponse>()
    
  } catch (error) {
    if(error instanceof HTTPError){
       const body = (await error.response.json()) as ApiErrorResponse

      // Aqui você repassa a mensagem real do backend
      throw new Error(body.message)
    }
    throw error
  }
}
function RouteComponent() {

  // const {data, isPending} = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: getUser
  // })

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: signIn,
  })

  return (
    <div>
      {isPending ? <Loader/> : JSON.stringify(data)}

      <div className="space-y-4">
        <button
          onClick={() => mutate()}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Fazer login
        </button>

        {isPending && <p>Enviando...</p>}

        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

        {error && (
          <p className="text-sm text-red-500">
            {(error as Error).message}
          </p>
        )}
      </div>
    </div>
  )
}
