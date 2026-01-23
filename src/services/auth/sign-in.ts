import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

export type SignInInput = {
  email: string
  password: string
}

export type SignInResponse = {
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
): Promise<SignInResponse | void> {
  try {
    const response = await api.post('sessions/password', {
      json: data,
    })

    // Se tiver body, parseia
    if (response.headers.get('content-length') !== '0') {
      return await response.json<SignInResponse>()
    }

    return
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
