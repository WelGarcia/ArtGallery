import axios from 'axios'

const TOKEN_KEY = 'artgallery_token'
const USER_KEY = 'artgallery_user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// O token é lido diretamente do localStorage para o interceptor não depender da store Pinia.
// Isso evita uma dependência circular entre api.js -> store -> authService.js -> api.js.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      const current = window.location.pathname + window.location.search
      if (window.location.pathname !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(current)}`
      }
    }

    if (error.response) {
      const apiError = error.response.data
      return Promise.reject({ message: apiError.message || 'Ocorreu um erro na requisição.', errors: apiError.errors || [], status: error.response.status })
    }
    if (error.request) return Promise.reject({ message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente.', errors: [], status: null })
    return Promise.reject({ message: 'Erro inesperado ao preparar a requisição.', errors: [], status: null })
  }
)

export default api
