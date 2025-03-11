<template>
  <h1>Login Page</h1>
  <button class="btn btn-primary" @click="handelClick">Login</button>
</template>

<script setup>
import { useRouter } from "vue-router";
const $router = useRouter();

const handelClick = () => {
  $router.push({ name: "tasks" });
};
</script>
