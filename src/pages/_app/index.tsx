import { api } from '@/services/http-cliente'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {

  const {data, isPending} = useQuery({
    queryKey: ['plants'],
    queryFn: getUser
  })



  return (
    <div>
      {isPending ? <Loader/> : JSON.stringify(data)}
    </div>
  )
}
  const getUser = async () => {
    const response = await api.get("plants")
    return await response.json()
  }
