import api from './api'

export function uploadArtwork(formData, onUploadProgress) {
  return api.post('/artworks/upload', formData, {
    headers: { 'Content-Type': undefined },
    onUploadProgress,
  })
}

export function getArtworkById(id) {
  return api.get(`/artworks/${id}`)
}

export function getMyArtworks() {
  return api.get('/my-artworks')
}

export function getArtworkForEdit(id) {
  return api.get(`/artworks/${id}/edit`)
}

export function updateArtwork(id, formData) {
  return api.put(`/artworks/${id}`, formData, {
    headers: { 'Content-Type': undefined },
  })
}

export function deleteArtwork(id) {
  return api.delete(`/artworks/${id}`)
}
