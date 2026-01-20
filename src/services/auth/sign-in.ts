import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

export type SignInInput = {
  email: string
  password: string
}

type SignInResponse = {
  token: string
  requiresPlantSelection?: boolean
  plants?: {
    id: string
    name: string
    role: string
    }[]
}

type ApiErrorResponse = {
  message: string
}


export async function signIn(
  data: SignInInput,
): Promise<SignInResponse> {
  try {
    return await api
      .post('sessions/password', {
        json: data,
      })
      .json<SignInResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
