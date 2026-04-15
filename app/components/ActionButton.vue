<template>
  <button @click="$emit('click')" class="start-btn">
    <slot></slot>
  </button>
</template>
