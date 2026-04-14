<script setup>
import { ref } from 'vue';

const { disabled } = defineProps({
  disabled: Boolean,
});
const emit = defineEmits(['action']);
const action = ref('');

function submitAction() {
  emit('action', action.value);
  action.value = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="submitAction" class="action-form">
      <label for="h-action" class="input-label">Your action</label>
      <div class="action-row">
        <input
          id="h-action"
          type="text"
          v-model="action"
          class="action-input"
        />
        <button :disabled="disabled" class="submit-btn">Do action</button>
      </div>
    </form>
  </section>
</template>

<style>
.action-form {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-text-hint);
  margin-bottom: 8px;
}

.action-row {
  display: flex;
}

.action-input {
  flex: 1;
  background: var(--c-surface-raised);
  border: 0.5px solid var(--c-border);
  border-radius: var(--radius-md);
  color: var(--c-text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  padding: 12px 16px;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
  min-height: 52px;
  max-height: 140px;
  margin-right: 1rem;
}

.submit-btn {
  background: var(--c-accent);
  color: var(--c-bg);
  border: none;
  border-radius: var(--radius-md);
  padding: 0 20px;
  height: 52px;
  font-family: var(--font-display);
  font-size: 16px;
  letter-spacing: 0.06em;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    opacity 0.15s ease,
    transform 0.1s ease;
}
</style>
