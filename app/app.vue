<script setup>
import '@/assets/global.css';
import { ref } from 'vue';

const waitingForAction = ref(true);
const actions = ref([
  'You are the superhero Sharpnado. You can fly. You archienemy is attacking you with missiles. You see a passage in a mountain near you, what do you do?',
]);

async function addAction(action) {
  waitingForAction.value = false;
  actions.value.push(`Your answer: ${action}`);

  const data = await $fetch('/api/interactions', {
    method: 'POST',
    body: {
      interactionId: '1234',
      content: action,
    },
  });

  actions.value.push(data.content);
  waitingForAction.value = true;
}
</script>

<template>
  <main class="app-shell">
    <header>
      <h1 class="app-title">Your superhero story</h1>
      <p></p>
    </header>

    <article>
      <section class="scenario-container">
        <p v-for="answer in actions" class="scenario-card">{{ answer }}</p>
      </section>

      <ActionPrompt @action="addAction" :disabled="!waitingForAction" />
    </article>
  </main>
</template>
