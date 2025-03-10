import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, completeTask, removeTask } from "@/http/task-api";


export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);

    const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed));
    const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed));

    const fetchAllTasks = async () => {
        const { data } = await allTasks();
        tasks.value = data.data;
    }

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

    return {
        tasks,
        completedTasks,
        uncompletedTasks,
        fetchAllTasks,
        handelAddedTask,
        handelUpdatedTask,
        handelCompletedTask,
        handelRemoveTask,
    }
});