<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, Ref } from "vue";
import { getTask, updateTask, deleteTask } from "../services/TaskService";
import type { Task } from "@/interfaces/Task";

const router = useRouter();
const route = useRoute();

const currentTask: Ref<Task> = ref({} as Task);

const id = route.params.id;
const loadTask = async (id: string) => {
  getTask(id)
    .then((res) => (currentTask.value = res.data))
    .catch((err) => console.log(err));
};

onMounted(() => {
  if (id) {
    loadTask(id as string);
  }
});

const handleUpdate = async () => {
  try {
    if (typeof id === "string") {
      await updateTask(id, currentTask.value);
      router.push("/");
    }
  } catch (error) {}
};
const handleDelete = async () => {
  try {
    if (typeof id === "string") {
      await deleteTask(id);
      router.push("/");
    }
  } catch (error) {}
};
</script>

<template>
  <div class="col-md-4 offset-md-4">
    <form @submit.prevent="handleUpdate" class="card card-body">
      <h1 class="card-title my-3 text-center">Update a Task</h1>

      <input
        type="text"
        v-model="currentTask.title"
        class="form-control mb-3"
      />

      <textarea
        v-model="currentTask.description"
        class="form-control mb-3"
      ></textarea>

      <button class="btn btn-primary">Update</button>
    </form>
    <button @click="handleDelete" class="btn btn-danger my-4">delete</button>
  </div>
</template>
