import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        task: {
            id: 1,
            name: 'Pinia is great!',
            is_completed: false,
        },
    })
});