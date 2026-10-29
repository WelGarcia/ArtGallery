import api from './api'

// O feed é uma visão de usuário, mesmo exibindo obras de arte.
export function getFeed(page = 1, limit = 12) {
  return api.get('/feed', { params: { page, limit } })
}

export function getPublicProfile(username) {
  return api.get(`/profile/${encodeURIComponent(username)}`)
}
