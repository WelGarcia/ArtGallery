<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../services/authService'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
})

const isSubmitting = ref(false)
const apiErrorMessage = ref('')

function validate() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!form.fullName.trim()) {
    errors.fullName = 'O nome completo é obrigatório.'
  }

  if (form.username.trim().length < 3 || form.username.trim().length > 20) {
    errors.username = 'O nome de usuário deve ter entre 3 e 20 caracteres.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(form.email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (form.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.'
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'As senhas não coincidem.'
  }

  return Object.values(errors).every((message) => message === '')
}

async function handleSubmit() {
  apiErrorMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await register({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      fullName: form.fullName.trim(),
    })

    console.log('Conta criada:', response.data)
    router.push({ name: 'login' })
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="login-page d-flex align-items-center justify-content-center py-5 px-3">
    <FormCard title="Criar Conta" subtitle="Cadastre-se para participar do ArtGallery.">
      <form @submit.prevent="handleSubmit">
        <BaseInput id="fullName" v-model="form.fullName" label="Nome completo" required :error="errors.fullName" />
        <BaseInput id="username" v-model="form.username" label="Usuário" required :error="errors.username" />
        <BaseInput id="email" v-model="form.email" label="E-mail" type="email" required :error="errors.email" />
        <BaseInput id="password" v-model="form.password" label="Senha" type="password" required :error="errors.password" />
        <BaseInput id="confirmPassword" v-model="form.confirmPassword" label="Confirmar senha" type="password" required :error="errors.confirmPassword" />
        <div v-if="apiErrorMessage" class="alert alert-danger">{{ apiErrorMessage }}</div>
        <BaseButton block :loading="isSubmitting" loading-text="Criando conta...">Criar Minha Conta</BaseButton>
      </form>
      <p class="text-center mt-4 mb-0">Já tem conta? <router-link to="/login">Entrar</router-link></p>
    </FormCard>
  </section>
</template>
