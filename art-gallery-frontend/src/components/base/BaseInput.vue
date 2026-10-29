<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: '' },
  maxlength: { type: [Number, String], default: undefined },
  accept: { type: String, default: '' },
})

const model = defineModel({ type: [String, Number], default: '' })
const emit = defineEmits(['change'])
const generatedId = useId()
const fieldId = computed(() => props.id || generatedId)
</script>

<template>
  <div class="mb-3">
    <label :for="fieldId" class="form-label">{{ label }}</label>
    <textarea v-if="type === 'textarea'" :id="fieldId" v-model="model"
              class="form-control" :rows="rows" :placeholder="placeholder"
              :disabled="disabled" :required="required" :maxlength="maxlength"
              :aria-invalid="!!error" />
    <input v-else-if="type === 'file'" :id="fieldId" type="file" class="form-control"
           :accept="accept" :disabled="disabled" :required="required"
           @change="emit('change', $event)" />
    <input v-else :id="fieldId" v-model="model" class="form-control"
           :type="type" :placeholder="placeholder" :disabled="disabled"
           :required="required" :autocomplete="autocomplete" :maxlength="maxlength"
           :aria-invalid="!!error" />
    <span v-if="error" class="text-danger small">{{ error }}</span>
    <div v-if="help" class="form-text">{{ help }}</div>
    <slot name="hint" />
  </div>
</template>
