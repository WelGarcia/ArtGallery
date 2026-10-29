import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getMyProfile } from '../services/authService'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/artworks/upload', name: 'artwork-upload', component: () => import('../views/UploadArtworkView.vue'), meta: { requiresAuth: true } },
  { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryView.vue'), meta: { requiresAuth: true } },
  { path: '/artworks/:id', name: 'artwork-detail', component: () => import('../views/ArtworkDetailView.vue') },
  { path: '/profile/me', name: 'my-profile', component: () => import('../views/profile/MyProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/:username', name: 'public-profile', component: () => import('../views/profile/PublicProfileView.vue') },
  { path: '/liked-artworks', name: 'liked-artworks', component: () => import('../views/LikedArtworksView.vue'), meta: { requiresAuth: true } },
  { path: '/my-artworks', name: 'my-artworks', component: () => import('../views/MyArtworksView.vue'), meta: { requiresAuth: true } },
  { path: '/artworks/:id/edit', name: 'artwork-edit', component: () => import('../views/EditArtworkView.vue'), meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboardView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/users', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/gallery', name: 'admin-gallery', component: () => import('../views/admin/AdminGalleryView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to) => {
  const auth = useAuth()
  if (!to.meta.requiresAuth) return true
  if (!auth.isAuthenticated.value) return { name: 'login', query: { redirect: to.fullPath } }

  try {
    const response = await getMyProfile()
    console.log('Perfil autenticado OK:', response.data)
  } catch (_) {
    return false // o interceptor de 401 já limpa a sessão e redireciona
  }

  if (to.meta.requiresAdmin && !auth.isAdmin.value) return { name: 'gallery' }
  return true
})

export default router
