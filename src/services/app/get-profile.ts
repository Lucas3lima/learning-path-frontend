import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

type GetProfileResponse = {
  user: {
    id: string
    name: string
    email: string
    registration_number: string
    role: 'user' | 'manager'
    plantRole: 'student' | 'manager'
    plantId: string
    plantName: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  try {
    return await api.get('profile').json<GetProfileResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 401) {
        throw new Error('Unauthorized')
      }

      const body = (await error.response.json()) as { message: string }
      throw new Error(body.message)
    }

    throw error
  }
}
