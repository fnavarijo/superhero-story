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
      <h1 class="app-title">A generative sequence</h1>
    </header>

    <article>
      <section v-if="actions.length === 0" class="start-btn-container">
        <ActionButton @click="startAdventure">Start Adventure</ActionButton>
      </section>
      <section v-else class="active-container">
        <div class="conversation-container">
          <StoryBubble v-for="answer in actions" :content="answer" />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
            actor="user"
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
          <StoryBubble
            content="You move with the practiced ease of someone who has done this before. The carriage door hisses open. He doesn't look up — but his shoulders shift, just slightly, the way a wolf's do when another animal enters its clearing. He knows."
          />
        </div>

        <ActionPrompt @action="addAction" :disabled="!waitingForAction" />
      </section>

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
