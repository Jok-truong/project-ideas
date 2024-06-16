<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <h1 class="text-3xl font-bold underline">Twitter</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false);
</script>
