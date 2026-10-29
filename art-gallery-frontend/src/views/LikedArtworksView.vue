<script setup>
import { ref, onMounted } from 'vue'
import { getLikedArtworks } from '../services/likeService'
import ArtworkCard from '../components/artwork/ArtworkCard.vue'

const artworks = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')
onMounted(async () => {
  try {
    const response = await getLikedArtworks()
    artworks.value = response.data
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container py-3">
    <h4 class="fw-bold mb-4">Obras Curtidas</h4>
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>
    <template v-else>
      <div v-if="artworks.length === 0" class="alert alert-info text-center">
        Você ainda não curtiu nenhuma obra.
        <router-link :to="{ name: 'gallery' }">Explore a Galeria</router-link>.
      </div>
      <div v-else class="row g-4">
        <div v-for="artwork in artworks" :key="artwork.id" class="col-6 col-md-4 col-lg-3">
          <ArtworkCard :artwork="artwork" />
        </div>
      </div>
    </template>
  </div>
</template>
