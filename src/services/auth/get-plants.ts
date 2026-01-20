import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

type GetPlantsResponse = {
  plants: {
    id: string
    name: string
    slug: string
  }[]
}

type ApiErrorResponse = {
  message: string
}


export async function getPlants(): Promise<GetPlantsResponse> {
  try {
    return await api
      .get('plants')
      .json<GetPlantsResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
