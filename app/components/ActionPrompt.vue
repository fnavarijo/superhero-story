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
