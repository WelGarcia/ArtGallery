<script setup>
import { ref, onMounted } from 'vue'
import { getMyArtworks, deleteArtwork } from '../services/artworkService'
import { useAuth } from '../composables/useAuth'
import ArtworkCard from '../components/artwork/ArtworkCard.vue'
import BaseModal from '../components/base/BaseModal.vue'

const { currentUser } = useAuth()
const artworks = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')
const artworkToDelete = ref(null)
const isDeleting = ref(false)
const deleteErrorMessage = ref('')

onMounted(async () => {
  try {
    const response = await getMyArtworks()
    artworks.value = response.data
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})

function askDelete(artwork) {
  deleteErrorMessage.value = ''
  artworkToDelete.value = artwork
}
function cancelDelete() {
  if (!isDeleting.value) artworkToDelete.value = null
}
async function confirmDelete() {
  if (!artworkToDelete.value || isDeleting.value) return
  isDeleting.value = true
  deleteErrorMessage.value = ''
  const id = artworkToDelete.value.id
  try {
    await deleteArtwork(id)
    artworks.value = artworks.value.filter((artwork) => artwork.id !== id)
    artworkToDelete.value = null
  } catch (error) {
    deleteErrorMessage.value = error.message
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Minhas Obras</h4>
      <router-link :to="{ name: 'artwork-upload' }" class="btn btn-brand rounded-pill px-4">
        <i class="bi bi-plus-lg"></i> Nova obra
      </router-link>
    </div>
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>
    <template v-else>
      <div v-if="artworks.length === 0" class="alert alert-info text-center">
        Você ainda não publicou nenhuma obra.
        <router-link :to="{ name: 'artwork-upload' }">Publique a primeira agora</router-link>.
      </div>
      <div v-else class="row g-4">
        <div v-for="artwork in artworks" :key="artwork.id" class="col-6 col-md-4 col-lg-3">
          <ArtworkCard :artwork="artwork" :author="currentUser">
            <template #actions>
              <div class="d-flex gap-2 mt-3">
                <router-link :to="{ name: 'artwork-edit', params: { id: artwork.id } }"
                             class="btn btn-sm btn-outline-secondary flex-fill">
                  <i class="bi bi-pencil"></i> Editar
                </router-link>
                <button type="button" class="btn btn-sm btn-outline-danger flex-fill" @click="askDelete(artwork)">
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </template>
          </ArtworkCard>
        </div>
      </div>
    </template>

    <BaseModal v-if="artworkToDelete" title="Excluir obra" :busy="isDeleting" @close="cancelDelete">
      <p class="mb-0">Tem certeza que deseja excluir <strong>{{ artworkToDelete.title }}</strong>?
        Essa ação não pode ser desfeita.</p>
      <p v-if="deleteErrorMessage" class="text-danger small mt-3 mb-0">{{ deleteErrorMessage }}</p>
      <template #footer>
        <button type="button" class="btn btn-secondary" :disabled="isDeleting" @click="cancelDelete">Cancelar</button>
        <button type="button" class="btn btn-danger" :disabled="isDeleting" @click="confirmDelete">
          {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>
