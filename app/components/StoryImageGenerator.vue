<template>
  <div class="story-image-generator-container">
    <button class="image-generator-button" @click="$emit('generate')">
      Generate scene image
    </button>
    <span class="image-generator-label">Visualize the moment</span>
  </div>
</template>

<style scoped>
.story-image-generator-container {
  border-top: 1px solid var(--c-black-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.image-generator-button {
  background: transparent;
  border: 1px solid var(--c-black-3);
  text-transform: uppercase;
  color: var(--c-text-hint);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  padding: 0.5rem 1rem;
  transition: all 250ms ease-in-out;
  cursor: pointer;
}

.image-generator-button:hover {
  border: 1px solid var(--c-purple);
  color: var(--c-purple);
}

.image-generator-label {
  text-transform: uppercase;
  font-family: var(--font-interaction);
  color: var(--c-text-secondary);
  letter-spacing: 0.18em;
  font-size: 0.75rem;
}
</style>
