<script setup>
import { useAuth } from '../../composables/useAuth'
const { isAuthenticated, isAdmin } = useAuth()
</script>

<template>
  <aside v-if="isAuthenticated" class="col-md-3 col-lg-2 d-none d-md-block sidebar py-4">
    <nav class="nav flex-column" aria-label="Navegação lateral">
      <router-link to="/gallery" class="nav-link">
        <i class="bi bi-grid-fill me-2" aria-hidden="true"></i>Galeria
      </router-link>
      <router-link to="/liked-artworks" class="nav-link">
        <i class="bi bi-heart-fill me-2" aria-hidden="true"></i>Curtidas
      </router-link>
      <router-link to="/profile/me" class="nav-link">
        <i class="bi bi-person-circle me-2" aria-hidden="true"></i>Meu Perfil
      </router-link>
      <template v-if="isAdmin">
        <hr />
        <p class="small text-muted px-3 mb-2">Administração</p>
        <router-link to="/admin" class="nav-link">
          <i class="bi bi-speedometer2 me-2" aria-hidden="true"></i>Dashboard Admin
        </router-link>
      </template>
    </nav>
  </aside>
</template>
