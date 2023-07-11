// import { refreshTokenService } from '@/services/authServices'
import axios, { type AxiosInstance } from 'axios'
//import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios'
// import router from '@/router'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:5000'
})

export default http

// http.interceptors.request.use(
//   (config: any) => {
//     const token: string | null = localStorage.getItem('access_token')
//     const refreshToken: string | null = localStorage.getItem('refresh_token')
//     const isAuthPath: boolean = config.url.includes('login') || false
//     const isRefreshPath: boolean = config.url.includes('refresh-token') || false
//     if (token && !isAuthPath && !isRefreshPath) config.headers.Authorization = `Bearer ${token}`
//     else if (refreshToken && !isAuthPath && isRefreshPath)
//       config.headers['x-refresh-token'] = refreshToken
//     return config
//   },
//   (error: AxiosError) => Promise.reject(error)
// )

// http.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const originalConfig: any = error.config
//     if (originalConfig?.url !== 'signin' && error.response) {
//       if (error.response?.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true
//         try {
//           const { data, status } = await refreshTokenService()
//           if (status === 200 || status === 201) {
//             localStorage.setItem('access_token', data.access_token)
//             localStorage.setItem('refresh_token', data.refresh_token)
//             return http(originalConfig)
//           }
//         } catch (erro) {
//           localStorage.removeItem('access_token')
//           localStorage.removeItem('refresh_token')
//           router.push('signin')
//           return Promise.reject(erro)
//         }
//       }
//     }
//   }
// )
