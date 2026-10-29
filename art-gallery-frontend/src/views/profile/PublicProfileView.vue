<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicProfile } from '../../services/userService'
import { profileImageUrl } from '../../utils/media'
import { useAuth } from '../../composables/useAuth'
import ArtworkCard from '../../components/artwork/ArtworkCard.vue'

const route = useRoute()
const { isAuthenticated } = useAuth()
const profile = ref(null)
const isLoading = ref(true)
const apiErrorMessage = ref('')

async function loadProfile() {
  isLoading.value = true
  apiErrorMessage.value = ''
  profile.value = null
  try {
    const response = await getPublicProfile(route.params.username)
    profile.value = response.data
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
onMounted(loadProfile)
watch(() => route.params.username, loadProfile)
</script>

<template>
  <div class="container py-4">
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>
    <div v-else-if="profile" class="row justify-content-center">
      <div class="col-md-10 col-xl-9">
        <div class="profile-card text-center p-4 mb-4">
          <img :src="profileImageUrl(profile.profilePicture)" :alt="profile.username" class="avatar-preview mb-3" />
          <h2 class="h4 fw-bold mb-1">{{ profile.fullName }}</h2>
          <p class="text-muted">@{{ profile.username }}</p>
          <p v-if="profile.bio" class="mb-3">{{ profile.bio }}</p>
          <p v-else class="text-muted mb-3">Nenhuma biografia ainda.</p>
          <div class="d-flex justify-content-center gap-4 mb-4">
            <div><h5 class="mb-0 fw-bold">{{ profile.artworksCount }}</h5><small class="text-muted">Obras</small></div>
            <div><h5 class="mb-0 fw-bold">{{ profile.followersCount }}</h5><small class="text-muted">Seguidores</small></div>
            <div><h5 class="mb-0 fw-bold">{{ profile.followingCount }}</h5><small class="text-muted">Seguindo</small></div>
          </div>
          <router-link v-if="profile.isOwner" :to="{ name: 'my-profile' }" class="btn btn-brand rounded-pill px-4">
            Editar Perfil
          </router-link>
          <!-- Apenas visual: a funcionalidade Seguir será feita na Aula 11. -->
          <button v-else-if="isAuthenticated" type="button" class="btn btn-brand rounded-pill px-4">Seguir</button>
        </div>
        <h4 class="fw-bold mb-3">Obras de {{ profile.fullName }}</h4>
        <div v-if="profile.Artworks.length === 0" class="alert alert-info text-center">
          {{ profile.fullName }} ainda não publicou nenhuma obra.
        </div>
        <div v-else class="row g-4">
          <div v-for="artwork in profile.Artworks" :key="artwork.id" class="col-6 col-md-4">
            <ArtworkCard :artwork="artwork" :author="profile" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
