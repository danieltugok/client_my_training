import type { AxiosInstance } from 'axios'
import http from '@/plugins/http'
import { objectToQueryString } from '@/utils/request'

export const getExercisesService = async (query: any): Promise<any> => {
  return await http.get<AxiosInstance>(`exercises${objectToQueryString(query)}`)
}

export const getExerciseByIdService = async (id: number): Promise<any> => {
  return await http.get<AxiosInstance>(`exercises/${id}`)
}

export const uploadFileExerciseService = async (file: any): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)
  return await http.post<AxiosInstance>('files/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteFileExerciseService = async (url: string): Promise<any> => {
  return await http.delete<AxiosInstance>(`files/${url}`)
}

export const editExerciseService = async (id: number, data: any): Promise<any> => {
  return await http.patch<AxiosInstance>(`exercises/${id}`, data)
}

export const createExerciseService = async (data: any): Promise<any> => {
  return await http.post<AxiosInstance>(`exercises`, data)
}

export const deleteExerciseService = async (id: number): Promise<any> => {
  return await http.delete<AxiosInstance>(`exercises/${id}`)
}
