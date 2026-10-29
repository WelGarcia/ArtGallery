<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getMyProfile, updateProfile } from '../../services/authService'
import { profileImageUrl } from '../../utils/media'
import { useAuth } from '../../composables/useAuth'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

const BIO_MAX = 255
const { updateUser } = useAuth()
const username = ref('')
const loading = ref(true)
const saving = ref(false)
const fullName = ref('')
const bio = ref('')
const currentPicture = ref('default-profile.png')
const selectedFile = ref(null)
const previewUrl = ref('')
const errorMessage = ref('')
const successMessage = ref('')

function validate() {
  errorMessage.value = ''
  if (!fullName.value.trim()) { errorMessage.value = 'O nome completo é obrigatório.'; return false }
  if (bio.value.length > BIO_MAX) { errorMessage.value = `A bio deve ter no máximo ${BIO_MAX} caracteres.`; return false }
  return true
}

function onPhotoChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) { errorMessage.value = 'Selecione um arquivo de imagem.'; return }
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  errorMessage.value = ''
}

async function loadProfile() {
  try {
    const response = await getMyProfile()
    const profile = response.data
    username.value = profile.username || ''
    fullName.value = profile.fullName || ''
    bio.value = profile.bio || ''
    currentPicture.value = profile.profilePicture || 'default-profile.png'
  } catch (error) { errorMessage.value = error.message }
  finally { loading.value = false }
}

async function saveProfile() {
  successMessage.value = ''
  if (!validate()) return
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('fullName', fullName.value.trim())
    formData.append('bio', bio.value.trim())
    if (selectedFile.value) formData.append('profilePicture', selectedFile.value)
    const response = await updateProfile(formData)
    currentPicture.value = response.data.profilePicture || 'default-profile.png'
    updateUser(response.data)
    selectedFile.value = null
    if (previewUrl.value) { URL.revokeObjectURL(previewUrl.value); previewUrl.value = '' }
    successMessage.value = response.message || 'Perfil atualizado com sucesso.'
  } catch (error) { errorMessage.value = error.message }
  finally { saving.value = false }
}

onMounted(loadProfile)
onUnmounted(() => { if (previewUrl.value) URL.revokeObjectURL(previewUrl.value) })
</script>

<template>
  <section class="container py-4">
    <div v-if="loading" class="alert alert-info">Carregando perfil...</div>
    <FormCard v-else title="Meu Perfil" wide>
      <form @submit.prevent="saveProfile">
        <div class="text-center mb-4"><img :src="previewUrl || profileImageUrl(currentPicture)" alt="Foto de perfil" class="avatar-preview"></div>
        <BaseInput id="photo" label="Foto de perfil" type="file" accept="image/*" help="A prévia é local e aparece antes do envio." @change="onPhotoChange" />
        <BaseInput id="username" label="Nome de usuário" :model-value="username" disabled />
        <BaseInput id="fullName" v-model="fullName" label="Nome completo" required />
        <BaseInput id="bio" v-model="bio" label="Bio" type="textarea" :maxlength="BIO_MAX">
          <template #hint>
            <div class="form-text text-end">{{ bio.length }}/{{ BIO_MAX }}</div>
          </template>
        </BaseInput>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <BaseButton :loading="saving" loading-text="Salvando...">Salvar alterações</BaseButton>
      </form>
    </FormCard>
  </section>
</template>
