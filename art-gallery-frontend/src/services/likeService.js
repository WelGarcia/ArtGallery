import api from './api'

export function toggleLike(artworkId) {
  return api.post(`/artworks/${artworkId}/toggle-like`)
}

export function getLikedArtworks() {
  return api.get('/liked-artworks')
}
