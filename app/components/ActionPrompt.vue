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
  <section class="action-prompt">
    <form @submit.prevent="submitAction" class="action-form">
      <input
        id="h-action"
        type="text"
        v-model="action"
        class="action-input"
        placeholder="What do you do?"
      />
      <button
        :disabled="disabled"
        class="submit-btn"
        :class="{ enable: Boolean(action) }"
      >
        Act ↵
      </button>
    </form>
  </section>
</template>

<style scoped>
.action-prompt {
  background-color: var(--c-black-2);
  border: 1px solid var(--c-black-3);
  padding: 0.875rem 1rem;
}

.action-form {
  width: 100%;
  display: flex;
  align-items: flex-end;
}

.action-input {
  background: transparent;
  border: none;
  flex: 1 1 0%;
  color: var(--c-text-primary);
}

.submit-btn {
  background: transparent;
  border: none;
  color: var(--c-text-secondary);
}
.submit-btn.enable {
  background: transparent;
  border: none;
  color: var(--c-text-tertiary);
}
</style>
