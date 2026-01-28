import { useGetJourneys } from '@/hooks/auth/useGetPlants'
import { createFileRoute } from '@tanstack/react-router'
import { LucideClockFading } from 'lucide-react'

export const Route = createFileRoute('/_app/catalog/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data, isLoading, error } = useGetJourneys()
  if (isLoading) return <LucideClockFading />

  if (error) return <p>{error.message}</p>

  return (
    <div className="grid gap-4">
      {data?.map(journey => (
        <div key={journey.id}>
          <p>{journey.id}</p>
          <p>{journey.title}</p>
        </div>
      ))}
    </div>
  )
}
