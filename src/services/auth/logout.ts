import { api } from '@/services/http-cliente'

export async function logout() {
  await api.post('sessions/logout')
}
