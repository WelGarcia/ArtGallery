<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useClickOutside } from '../../composables/useClickOutside'
import { profileImageUrl } from '../../utils/media'

const router = useRouter()
const { isAuthenticated, isAdmin, currentUser, logout } = useAuth()
const isMenuOpen = ref(false)
const menuRef = ref(null)
function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
function closeMenu() { isMenuOpen.value = false }
useClickOutside(menuRef, closeMenu)

async function handleLogout() {
  closeMenu()
  await logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container-fluid px-lg-5">
      <router-link to="/" class="navbar-brand fw-bold text-decoration-none">
        <i class="bi bi-palette-fill me-2" aria-hidden="true"></i>ArtGallery
      </router-link>
      <div class="d-flex align-items-center flex-wrap gap-2 ms-auto">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-brand">Entrar</router-link>
          <router-link to="/register" class="btn btn-brand">Criar Conta</router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'artwork-upload' }" class="btn btn-outline-brand btn-sm">
            <i class="bi bi-plus-square me-1" aria-hidden="true"></i>Enviar Obra
          </router-link>
          <router-link to="/gallery" class="nav-link px-2">Galeria</router-link>
          <router-link v-if="isAdmin" to="/admin" class="nav-link px-2">Admin</router-link>
          <div ref="menuRef" class="dropdown" @keydown.esc="closeMenu">
            <button type="button" class="nav-link dropdown-toggle d-flex align-items-center gap-2 px-2"
                    aria-haspopup="true" :aria-expanded="isMenuOpen" @click="toggleMenu">
              <img :src="profileImageUrl(currentUser?.profilePicture)" alt="" width="32" height="32"
                   class="rounded-circle navbar-avatar" />
              <span>{{ currentUser?.username }}</span>
            </button>
            <ul v-if="isMenuOpen" class="dropdown-menu dropdown-menu-end show shadow border-0"
                data-bs-popper="static" @click="closeMenu">
              <li><router-link :to="{ name: 'my-profile' }" class="dropdown-item py-2">
                <i class="bi bi-gear me-2"></i>Editar Perfil
              </router-link></li>
              <li><router-link :to="{ name: 'public-profile', params: { username: currentUser?.username } }" class="dropdown-item py-2">
                <i class="bi bi-person me-2"></i>Ver Perfil
              </router-link></li>
              <li><router-link :to="{ name: 'my-artworks' }" class="dropdown-item py-2">
                <i class="bi bi-images me-2"></i>Minhas Obras
              </router-link></li>
              <li><router-link :to="{ name: 'liked-artworks' }" class="dropdown-item py-2">
                <i class="bi bi-heart me-2"></i>Curtidas
              </router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><button type="button" class="dropdown-item py-2 text-danger" @click="handleLogout">
                <i class="bi bi-box-arrow-right me-2"></i>Sair
              </button></li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>
