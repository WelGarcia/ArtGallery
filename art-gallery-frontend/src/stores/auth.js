import { defineStore } from 'pinia'
import * as authService from '../services/authService'

const TOKEN_KEY = 'artgallery_token'
const USER_KEY = 'artgallery_user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    isAdmin: (state) => Boolean(state.user?.isAdmin),
  },
  actions: {
    async login(credentials) {
      const response = await authService.login(credentials)
      this.token = response.data.token
      this.user = response.data.user
      localStorage.setItem(TOKEN_KEY, this.token)
      localStorage.setItem(USER_KEY, JSON.stringify(this.user))
      return this.user
    },
    async logout() {
      try { if (this.token) await authService.logout() } catch (_) { /* sessão local ainda deve ser encerrada */ }
      this.clearSession()
    },
    updateUser(newUserData) {
      this.user = { ...this.user, ...newUserData }
      localStorage.setItem(USER_KEY, JSON.stringify(this.user))
    },
    clearSession() {
      this.token = null
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})

export { TOKEN_KEY, USER_KEY }
