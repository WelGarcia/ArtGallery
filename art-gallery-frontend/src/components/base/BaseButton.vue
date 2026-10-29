<script setup>
defineProps({
  type: { type: String, default: 'submit' },
  variant: { type: String, default: 'brand' },
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: 'Enviando...' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})
</script>

<template>
  <button :type="type" class="btn btn-lg" :class="[`btn-${variant}`, { 'w-100': block }]"
          :disabled="disabled || loading">
    {{ loading ? loadingText : '' }}<slot v-if="!loading" />
  </button>
</template>
