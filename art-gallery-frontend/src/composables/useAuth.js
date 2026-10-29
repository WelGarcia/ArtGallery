import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

// Compartilha o estado de autenticação da Pinia com Navbar, Sidebar, rotas e Perfil.
export function useAuth() {
  const authStore = useAuthStore()
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isAdmin = computed(() => authStore.isAdmin)
  const currentUser = computed(() => authStore.user)

  async function login(credentials) {
    return authStore.login(credentials)
  }

  async function logout() {
    await authStore.logout()
  }

  function updateUser(newUserData) {
    authStore.updateUser(newUserData)
  }

  return { isAuthenticated, isAdmin, currentUser, login, logout, updateUser }
}
