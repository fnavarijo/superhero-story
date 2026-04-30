<script setup>
const { actor, content } = defineProps({
  actor: {
    type: String, // user | model
    default: 'model',
  },
  content: {
    type: String,
    required: true,
  },
});

const isModelActor = actor === 'model';
</script>

<template>
  <div class="story-bubble">
    <header
      class="story-actor"
      :class="[isModelActor ? 'actor-model' : 'actor-user']"
    >
      {{ isModelActor ? 'Narrator' : 'You' }}
    </header>

    <div
      class="story-detail"
      :class="[isModelActor ? 'actor-model' : 'actor-user']"
    >
      {{ content }}
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
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
}

.story-actor.actor-model {
  color: var(--c-text-secondary);
}

.story-actor.actor-user {
  text-align: right;
  font-weight: 500;
  color: var(--c-text-tertiary);
}

.story-detail.actor-user {
  font-style: italic;
  font-size: 1rem;
  color: var(--c-text-hint);
  text-align: right;
}

.story-detail {
  font-size: 1.125rem;
}
</style>
