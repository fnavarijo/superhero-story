<script setup>
import '@/assets/global.css';
import { ref } from 'vue';

const bottomRef = ref(null);
const waitingForAction = ref(true);
const actions = ref([]);
// const generatedImage = ref('');

function scrollToBottom() {
  bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
}

function buildEntry(role, content) {
  // role: user | model
  return { role, content };
}

async function performInteraction(content) {
  const data = await $fetch('/api/interactions', {
    method: 'POST',
    body: {
      interactionId: '1234',
      content: content || null,
    },
  });

  actions.value.push(buildEntry('model', data.content));
  waitingForAction.value = true;
}

async function startAdventure() {
  await performInteraction();
}

async function addAction(action) {
  waitingForAction.value = false;
  actions.value.push(buildEntry('user', action));

  await performInteraction(action);

  scrollToBottom();
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
      <h1 class="app-title">A generative sequence</h1>
    </header>

    <article>
      <section v-if="actions.length === 0" class="start-btn-container">
        <ActionButton @click="startAdventure">Start Adventure</ActionButton>
      </section>
      <section v-else class="active-container">
        <div class="conversation-container">
          <StoryBubble
            v-for="action in actions"
            :actor="action.role"
            :content="action.content"
          />
        </div>

        <!-- <StoryImage v-show="generatedImage" :src="generatedImage" />
        <StoryImageGenerator @generate="createImage" /> -->

        <ActionPrompt @action="addAction" :disabled="!waitingForAction" />
        <div ref="bottomRef"></div>
      </section>
    </article>
  </main>
</template>
