// src/lib/decode-jwt.ts
import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  sub: string
  role: string
  plantRole: string
  plantId: string
  iat: number
  exp: number
}

export function decodeJwt(token: string) {
  return jwtDecode<JwtPayload>(token)
}
