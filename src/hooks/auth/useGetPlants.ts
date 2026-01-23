import { getPlants } from "@/services/auth/get-plants"
import { useQuery } from "@tanstack/react-query"


export function useGetPlants() {
  return useQuery({
    queryKey: ['plants'],
    queryFn: getPlants,
  })
}