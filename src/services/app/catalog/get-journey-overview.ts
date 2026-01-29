import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

export type GetJourneyOverviewResponse = {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail_url: string | null
  visible: boolean
  responsible: {
    id: string
    name: string
    email: string
  }
  sectors: {
    id: string
    name: string
  }[]
  modules: {
    id: string
    title: string
    order: number
    slug: string
    hour: number
    description: string
    totalLessons: number
    totalExams: number
    totalCompleted: number
    progress: number
  }[]
  totalHours: number
  totalModules: number
  progress: number
  completed: boolean
}


type ApiErrorResponse = {
  message: string
}


export async function getJourneyOverview(slug: string): Promise<GetJourneyOverviewResponse> {
  try {
    return await api
      .get(`journeys/${slug}/overview`)
      .json<GetJourneyOverviewResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
