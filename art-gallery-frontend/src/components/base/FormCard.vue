<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  wide: { type: Boolean, default: false },
})
</script>

<template>
  <div class="auth-card card shadow border-0 mx-auto" :class="{ 'auth-card-wide': wide }">
    <div class="card-body p-4 p-md-5">
      <div class="auth-header">
        <div class="brand-mark mb-3">AG</div>
        <h1 class="h3 fw-bold mb-2">{{ title }}</h1>
        <p v-if="subtitle" class="text-secondary mb-4">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
  </div>
</template>
