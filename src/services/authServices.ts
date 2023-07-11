import type { AxiosInstance } from 'axios'
import http from '@/plugins/http'

export const signInService = async (email: string, password: string): Promise<any> => {
  return await http.post<AxiosInstance>('login', { email, password })
}
export const forgoutPasswordService = async (email: string): Promise<any> => {
  return await http.post<AxiosInstance>(`forgout-password`, { email })
}

export const refreshTokenService = async (): Promise<any> => {
  return await http.patch<AxiosInstance>(`refresh-token`)
}
