<script setup>
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

<style>
:root {
  /* Backgrounds */
  --c-bg: #0a0b0f;
  --c-surface: #13151c;
  --c-surface-raised: #1c1f2b;

  /* Borders */
  --c-border: rgba(255, 255, 255, 0.07);
  --c-border-strong: rgba(245, 192, 48, 0.35);

  /* Accent — gold */
  --c-accent: #f5c030;
  --c-accent-dim: rgba(245, 192, 48, 0.12);
  --c-accent-glow: rgba(245, 192, 48, 0.06);

  /* Semantic */
  --c-success: #3bba7c;
  --c-danger: #e04a3f;

  /* Text */
  --c-text-primary: #f0ede4;
  --c-text-secondary: #8a8a9a;
  --c-text-hint: #50505f;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* Typography */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html {
  -webkit-text-size-adjust: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--c-bg);
  color: var(--c-text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.65;
  min-height: 100vh;
}

.app-shell {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

.scenario-card {
  background: var(--c-surface);
  border: 0.5px solid var(--c-border);
  border-left: 2px solid var(--c-accent);
  border-radius: var(--radius-md);
  padding: 16px 18px;
}

.scenario-container > p {
  margin-bottom: 1rem;
}

.app-title {
  font-family: var(--font-display);
  font-size: 32px;
  letter-spacing: 0.08em;
  color: var(--c-text-primary);
  margin-bottom: 2rem;
}
</style>
