import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

// Create axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/json/server',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    // Handle errors
    return Promise.reject(error)
  }
)

// Generic request function
export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return service.request(config)
}

export default service