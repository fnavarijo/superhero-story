<script>
const { actor } = defineProps({
  actor: String, // user | model
});
</script>

<template>
  <div class="story-bubble">
    <header class="story-actor">Narrator</header>

    <div class="story-detail">
      You move with the practiced ease of someone who has done this before. The
      carriage door hisses open. He doesn't look up — but his shoulders shift,
      just slightly, the way a wolf's do when another animal enters its
      clearing. He knows.
    </div>
  </div>
</template>

<style scoped>
.story-bubble {
  display: flex;
  flex-direction: column;
  row-gap: 0.375rem;
}

.story-actor {
  font-size: 0.75rem;
  font-family: var(--font-interaction);
  color: var(--c-text-secondary);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
}

.story-detail {
  font-size: 1.125rem;
}
</style>
