<script setup>
import '@/assets/global.css';
import { ref } from 'vue';

const waitingForAction = ref(true);
const actions = ref([]);

async function performInteraction(content) {
  const data = await $fetch('/api/interactions', {
    method: 'POST',
    body: {
      interactionId: '1234',
      content: content || null,
    },
  });

  actions.value.push(data.content);
  waitingForAction.value = true;
}

async function startAdventure() {
  await performInteraction();
}

async function addAction(action) {
  waitingForAction.value = false;
  actions.value.push(`Your answer: ${action}`);

  await performInteraction(action);
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

      <button v-if="actions.length === 0" @click="startAdventure">
        Start Adventure
      </button>
      <ActionPrompt v-else @action="addAction" :disabled="!waitingForAction" />
    </article>
  </main>
</template>
