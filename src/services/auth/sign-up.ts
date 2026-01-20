import { HTTPError } from 'ky'
import { api } from '@/services/http-cliente'

export type SignUpInput = {
  name: string
  email: string
  password: string
  registration_number: string
  role: 'user',
  plant_id: string
}

type SignUpResponse = {
  userId: string
}

type ApiErrorResponse = {
  message: string
}


export async function signUp(
  data: SignUpInput,
): Promise<SignUpResponse> {
  try {
    return await api
      .post('users', {
        json: data,
      })
      .json<SignUpResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const body =
        (await error.response.json()) as ApiErrorResponse

      throw new Error(body.message)
    }

    throw error
  }
}
