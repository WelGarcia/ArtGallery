<script setup>
import { computed } from 'vue'
import { getArtworkUrl, profileImageUrl } from '../../utils/media'

const props = defineProps({
  artwork: { type: Object, required: true },
  author: { type: Object, default: null },
})
const displayAuthor = computed(() => props.author ?? props.artwork.User)
</script>

<template>
  <div class="artwork-card">
    <router-link :to="{ name: 'artwork-detail', params: { id: artwork.id } }" class="d-block">
      <div class="artwork-card-media">
        <img :src="getArtworkUrl(artwork.imagePath)" :alt="artwork.title" class="artwork-card-image" />
        <span class="artwork-badge-views"><i class="bi bi-eye" aria-hidden="true"></i> {{ artwork.views }}</span>
      </div>
    </router-link>
    <div class="p-3">
      <h6 class="text-truncate mb-1">
        <router-link :to="{ name: 'artwork-detail', params: { id: artwork.id } }" class="text-decoration-none text-dark">
          {{ artwork.title }}
        </router-link>
      </h6>
      <router-link v-if="displayAuthor" :to="{ name: 'public-profile', params: { username: displayAuthor.username } }"
                   class="d-flex align-items-center text-decoration-none">
        <img :src="profileImageUrl(displayAuthor.profilePicture)" :alt="displayAuthor.username"
             class="rounded-circle me-2" width="24" height="24" style="object-fit: cover" />
        <span class="text-muted small text-truncate">@{{ displayAuthor.username }}</span>
      </router-link>
      <div v-if="artwork.likesCount !== undefined" class="d-flex gap-3 text-muted small mt-2">
        <span><i class="bi bi-heart" aria-hidden="true"></i> {{ artwork.likesCount }}</span>
        <span><i class="bi bi-chat" aria-hidden="true"></i> {{ artwork.commentsCount }}</span>
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>
