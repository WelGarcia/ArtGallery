<script setup>
import { ref, onMounted } from 'vue'
import { getFeed } from '../services/userService'
import ArtworkCard from '../components/artwork/ArtworkCard.vue'
import BaseButton from '../components/base/BaseButton.vue'

const LIMIT = 12
const artworks = ref([])
const page = ref(1)
const hasMore = ref(true)
const isLoading = ref(true)
const isLoadingMore = ref(false)
const apiErrorMessage = ref('')

async function loadGallery() {
  isLoading.value = true
  apiErrorMessage.value = ''
  try {
    const response = await getFeed(page.value, LIMIT)
    artworks.value = response.data
    hasMore.value = response.data.length === LIMIT
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function loadMore() {
  isLoadingMore.value = true
  apiErrorMessage.value = ''
  const nextPage = page.value + 1
  try {
    const response = await getFeed(nextPage, LIMIT)
    artworks.value = [...artworks.value, ...response.data]
    hasMore.value = response.data.length === LIMIT
    page.value = nextPage
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(loadGallery)
</script>

<template>
  <div class="container py-3">
    <h4 class="fw-bold mb-4">Galeria de Obras</h4>
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="apiErrorMessage && artworks.length === 0" class="text-danger text-center">{{ apiErrorMessage }}</p>
    <template v-else>
      <div v-if="artworks.length === 0" class="alert alert-info text-center">
        Nenhuma obra disponível no momento. Seja o primeiro a publicar uma!
      </div>
      <div v-else class="row g-4">
        <div v-for="artwork in artworks" :key="artwork.id" class="col-6 col-md-4 col-lg-3">
          <ArtworkCard :artwork="artwork" />
        </div>
      </div>
      <p v-if="apiErrorMessage" class="text-danger text-center mt-3">{{ apiErrorMessage }}</p>
      <div v-if="hasMore" class="text-center mt-5">
        <BaseButton type="button" variant="outline-primary" :loading="isLoadingMore"
                    loading-text="Carregando..." @click="loadMore">
          Carregar mais obras
        </BaseButton>
      </div>
    </template>
  </div>
</template>
