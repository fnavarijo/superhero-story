<script setup>
const { src } = defineProps({
  src: {
    type: String,
  },
});
</script>

<template>
  <div>
    <span class="story-image-header"> -- Scene · Generated </span>
    <img class="story-image" :src="src" height="320" width="320" alt="" />
  </div>
</template>

<style scoped>
.story-image-header {
  color: var(--c-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-weight: 500;
  font-size: 0.75rem;
  font-family: var(--font-interaction);
}

.story-image {
  margin: 2rem auto;
}
</style>
