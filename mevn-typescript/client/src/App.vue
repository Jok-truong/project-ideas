<script setup lang="ts">
import NavbarComponent from "./components/NavBarComponent.vue";
</script>

<template>
  <div>
    <NavbarComponent />

    <main class="container py-5">
      <router-view />
    </main>
  </div>
</template>
