import type { AxiosInstance } from 'axios'
import http from '@/plugins/http'
import { objectToQueryString } from '@/utils/request'

export const getExercisesService = async (query: any): Promise<any> => {
  return await http.get<AxiosInstance>(`exercises${objectToQueryString(query)}`)
}

export const getExerciseByIdService = async (id: number): Promise<any> => {
  return await http.get<AxiosInstance>(`exercises/${id}`)
}
