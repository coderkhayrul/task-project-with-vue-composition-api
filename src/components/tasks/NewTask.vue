<template>
  <div class="relative">
    <input
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue";

const NewTask = reactive({
  name: "",
  user_id: 1,
  is_completed: false,
});

const emit = defineEmits(["added"]);

const addNewTask = (event) => {
  if (event.target.value.trim()) {
    NewTask.name = event.target.value;
    event.target.value = "";
    emit("added", NewTask);
  }
};
</script>
