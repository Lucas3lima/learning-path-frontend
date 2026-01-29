import { getJourneyOverview } from "@/services/app/catalog/get-journey-overview";
import { useQuery } from "@tanstack/react-query";

export function useJourneyOverview(slug: string) {
    return useQuery({
        queryKey: ['journey-overview',slug],
        queryFn: () => getJourneyOverview(slug),
        enabled: !!slug
    })
}