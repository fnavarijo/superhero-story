<script setup>
import '@/assets/global.css';
import { ref } from 'vue';

const waitingForAction = ref(true);
const actions = ref([]);
// const generatedImage = ref('');

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

// async function createImage() {
//   const data = await $fetch('/api/images', {
//     method: 'POST',
//     body: {
//       content: actions.value[0].parts[0].text,
//     },
//   });

//   generatedImage.value = data.image[0].replace('public/', '');
// }
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <span class="app-shadowmark">Your superhero story</span>
      <h1 class="app-title">The Last Train at Verdant Station</h1>
    </header>

    <article>
      <section class="scenario-container">
        <p v-for="answer in actions" class="scenario-card">{{ answer }}</p>
      </section>
      <StoryBubble />

      <div v-if="actions.length === 0" class="start-btn-container">
        <ActionButton @click="startAdventure">Start Adventure</ActionButton>
      </div>

      <ActionPrompt v-else @action="addAction" :disabled="!waitingForAction" />

      <!-- <div v-if="actions.length > 0" class="image-container">
        <ActionButton @click="createImage">Generate Image</ActionButton>
        <img
          height="320"
          width="320"
          v-show="generatedImage"
          :src="generatedImage"
          alt=""
        />
      </div> -->
    </article>
  </main>
</template>
