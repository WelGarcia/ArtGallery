export function profileImageUrl(filename) {
  if (!filename) filename = 'default-profile.png'
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename
  return `${import.meta.env.VITE_MEDIA_URL}/uploads/profiles/${filename}`
}

// Obras do Grupo B são um único arquivo de imagem, sem thumbnail separada.
export function getArtworkUrl(filename) {
  return `${import.meta.env.VITE_MEDIA_URL}/uploads/artworks/${filename}`
}
