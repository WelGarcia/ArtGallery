import api from './api'

export function getComments(artworkId) {
  return api.get(`/artworks/${artworkId}/comments`)
}

export function addComment(artworkId, content) {
  return api.post(`/artworks/${artworkId}/comments`, { content })
}
