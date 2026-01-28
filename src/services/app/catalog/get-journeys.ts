import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

export type GetJourneysResponse = {
  id: string
  title: string
  slug: string
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
  totalHours: number
  totalModules: number
  progress: number
  completed: boolean
}[]


type ApiErrorResponse = {
  message: string
}


export async function getJourneys(): Promise<GetJourneysResponse> {
  try {
    return await api
      .get('journeys')
      .json<GetJourneysResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
