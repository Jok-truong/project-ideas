<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import { getTasks } from "../services/TaskService";
import type { Task } from "@/interfaces/Task";

const router = useRouter();

const tasks: Ref<Task[]> = ref([]);

const loadTasks = async () => {
  getTasks()
    .then((res) => (tasks.value = res.data))
    .catch((err) => console.log(err));
};

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item list-group-item-action p-4"
      style="cursor: pointer"
      v-for="(task, index) in tasks"
      :key="index"
      @click="router.push(`/tasks/${task._id}`)"
    >
      {{ index + 1 }}.
      {{ task.title }}
    </li>
  </ul>
</template>
