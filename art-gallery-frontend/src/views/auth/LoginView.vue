<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const form = reactive({ login: '', password: '' })
const errorMessage = ref('')
const loading = ref(false)

async function submit() {
  errorMessage.value = ''
  loading.value = true
  try {
    await auth.login(form)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/gallery'
    await router.push(redirect)
  } catch (error) {
    errorMessage.value = error.message || 'Não foi possível realizar o login.'
  } finally { loading.value = false }
}
</script>

<template>
  <section class="login-page d-flex align-items-center justify-content-center py-5 px-3">
    <FormCard title="Entrar no ArtGallery" subtitle="Acesse sua conta para explorar a galeria.">
      <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
      <form @submit.prevent="submit">
        <BaseInput id="email" v-model.trim="form.login" label="E-mail ou usuário" required autocomplete="username" />
        <BaseInput id="password" v-model="form.password" label="Senha" type="password" required autocomplete="current-password" />
        <BaseButton block :loading="loading" loading-text="Entrando...">Entrar</BaseButton>
      </form>
      <p class="text-center mt-4 mb-0">Ainda não tem conta? <router-link to="/register">Criar Conta</router-link></p>
    </FormCard>
  </section>
</template>
