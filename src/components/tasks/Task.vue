<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        :class="completedClass"
        type="checkbox"
        :checked="task.is_completed"
      />
      <div
        class="ms-2 flex-grow-1"
        :class="completedClass"
        title="Double click the text to edit or remove"
        @dblclick="isEdit = true"
      >
        <div class="relative" v-if="isEdit">
          <input
            class="editable-task"
            type="text"
            @keyup.esc="isEdit = false"
            v-focus
            @keyup.enter="updateTask"
          />
        </div>
        <span v-else>{{ task.name }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
    </div>
    <!-- Task Action --->
    <TaskAction @edit="isEdit = true" v-show="!isEdit" />
  </li>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskAction from "./TaskAction.vue";

const props = defineProps({
  task: Object,
});
const emit = defineEmits(["updated"]);

const completedClass = computed(() =>
  props.task.is_completed ? "completed" : ""
);

const isEdit = ref(false);

const vFocus = {
  mounted: (el) => el.focus(),
};

const updateTask = (event) => {
  const updatedTask = {
    ...props.task,
    name: event.target.value,
  };
  isEdit.value = false;
  emit("updated", updatedTask);
};
</script>
