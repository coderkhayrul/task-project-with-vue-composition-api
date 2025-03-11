<template>
  <div class="container my-5">
    <h1>404</h1>
    <p>
      Page <code>{{ $route.params.notFound }}</code> not found
    </p>
    <router-link :to="{ name: 'tasks' }" class="btn btn-primary">
      Go to Tasks
    </router-link>
  </div>
</template>
