<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <h1>Login Page</h1>
    <button class="btn btn-primary" @click="handelClick">Login</button>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
const $router = useRouter();

const handelClick = () => {
  $router.push({ name: "tasks" });
};
</script>
