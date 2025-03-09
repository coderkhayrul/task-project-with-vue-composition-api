<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handelAddedTask" />
          <!-- List of uncompleted tasks -->
          <Tasks
            :tasks="uncompletedTasks"
            @updated="handelUpdatedTask"
            @completed="handelCompletedTask"
            @remove="handelRemoveTask"
          />
          <!-- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="($event) => (showCompletedTasks = !showCompletedTasks)"
            >
              <span v-if="!showCompletedTasks">Show Completed</span>
              <span v-else>Hide Completed</span>
            </button>
          </div>
          <!-- List of completed tasks -->
          <Tasks
            :tasks="completedTasks"
            :show="completeTaskIsVisible && showCompletedTasks"
            @updated="handelUpdatedTask"
            @completed="handelCompletedTask"
            @remove="handelRemoveTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import {
  allTasks,
  createTask,
  updateTask,
  completeTask,
  removeTask,
} from "../http/task-api.js";
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const tasks = ref([]);

onMounted(async () => {
  const { data } = await allTasks();
  tasks.value = data.data;
});

const uncompletedTasks = computed(() =>
  tasks.value.filter((task) => !task.is_completed)
);
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.is_completed)
);

const showToggleCompletedBtn = computed(
  () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const completeTaskIsVisible = computed(
  () => uncompletedTasks.value.length > 0 || completedTasks.value.length > 0
);

const showCompletedTasks = ref(false);

const handelAddedTask = async (NewTask) => {
  const { data: createdTask } = await createTask(NewTask);
  tasks.value.unshift(createdTask.data);
};

const handelUpdatedTask = async (task) => {
  const { data: updatedTask } = await updateTask(task.id, {
    name: task.name,
  });

  const currentTask = tasks.value.find((item) => item.id === task.id);
  currentTask.name = updatedTask.data.name;
};
const handelCompletedTask = async (task) => {
  const { data: updatedTask } = await completeTask(task.id, {
    is_completed: task.is_completed,
  });

  const currentTask = tasks.value.find((item) => item.id === task.id);
  currentTask.is_completed = updatedTask.data.is_completed;
};

const handelRemoveTask = async (task) => {
  await removeTask(task.id);
  const index = tasks.value.findIndex((item) => item.id === task.id);
  tasks.value.splice(index, 1);
};
</script>
