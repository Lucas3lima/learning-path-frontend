import { getJourneys, type GetJourneysResponse } from '@/services/app/catalog/get-journeys'
import { useQuery } from '@tanstack/react-query'

export function useGetJourneys() {
  return useQuery<GetJourneysResponse>({
    queryKey: ['journeys'],
    queryFn: getJourneys,
  })
}
