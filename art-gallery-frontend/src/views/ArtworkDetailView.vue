<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArtworkById } from '../services/artworkService'
import { getArtworkUrl, profileImageUrl } from '../utils/media'
import LikeButton from '../components/artwork/LikeButton.vue'
import CommentSection from '../components/artwork/CommentSection.vue'

const route = useRoute()
const artwork = ref(null)
const isLoading = ref(true)
const apiErrorMessage = ref('')

async function loadArtwork() {
  isLoading.value = true
  apiErrorMessage.value = ''
  artwork.value = null
  try {
    const response = await getArtworkById(route.params.id)
    artwork.value = response.data // inclui isOwner, necessário em aulas futuras
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

onMounted(loadArtwork)
// Se navegar diretamente de uma obra para outra, o Vue reutiliza o componente.
watch(() => route.params.id, loadArtwork)
</script>

<template>
  <div class="container py-3">
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>
    <div v-else-if="artwork" class="row g-4">
      <div class="col-12 col-lg-7">
        <img :src="getArtworkUrl(artwork.imagePath)" :alt="artwork.title" class="artwork-detail-image" />
      </div>
      <div class="col-12 col-lg-5">
        <h1 class="h4 fw-bold mb-3">{{ artwork.title }}</h1>
        <div class="d-flex align-items-center mb-3" v-if="artwork.User">
          <router-link :to="{ name: 'public-profile', params: { username: artwork.User.username } }"
                       class="d-flex align-items-center text-decoration-none text-dark">
            <img :src="profileImageUrl(artwork.User.profilePicture)" :alt="artwork.User.username"
                 class="rounded-circle me-2" width="40" height="40" style="object-fit: cover" />
            <div>
              <h6 class="mb-0">{{ artwork.User.fullName }}</h6>
              <small class="text-muted">@{{ artwork.User.username }}</small>
            </div>
          </router-link>
          <span class="ms-auto text-muted small">{{ artwork.views }} visualizações</span>
        </div>
        <p v-else class="text-muted small">{{ artwork.views }} visualizações</p>
        <div class="d-flex align-items-start gap-2 mb-3">
          <LikeButton :artwork-id="artwork.id" :initial-liked="artwork.isLiked"
                      :initial-count="artwork.likesCount" />
          <router-link v-if="artwork.isOwner" :to="{ name: 'artwork-edit', params: { id: artwork.id } }"
                       class="btn btn-outline-secondary rounded-pill">
            <i class="bi bi-pencil"></i> Editar
          </router-link>
        </div>
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="card-text mb-0">{{ artwork.description || 'Sem descrição.' }}</p>
          </div>
        </div>
        <CommentSection :artwork-id="artwork.id" />
      </div>
    </div>
  </div>
</template>
