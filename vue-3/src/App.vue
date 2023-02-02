<script setup lang="ts">
import { ref } from 'vue';
import Desk from "./components/Desk.vue";

const keyComponent = ref<string | number>(Math.random())

const changeKey = (): void => {
  keyComponent.value = Math.random()
}

</script>

<template>
  <main class="container">
    <Desk :key="keyComponent" @reload="changeKey"/>
  </main>
</template>

<style scoped>
.container {
    display: grid;
    height: 90vh;
    aspect-ratio: 1;
}
</style>
