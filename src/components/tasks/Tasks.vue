<template>
  <div class="card mt-2" v-if="tasks.length && show">
    <ul class="list-group list-group-flush">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @updated="handelUpdatedTask"
        @completed="handelCompletedTask"
        @remove="handelRemoveTask"
      />
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/task";
import Task from "../tasks/Task.vue";

const store = useTaskStore();

const { handelUpdatedTask, handelCompletedTask, handelRemoveTask } = store;

defineProps({
  tasks: Array,
  show: {
    type: Boolean,
    default: true,
  },
});
</script>
