<script setup lang="ts">
import type { Task } from "@/interfaces/Task";
import { createTask } from "@/services/TaskService";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const title = ref("");
const description = ref("");

const saveTask = async () => {
  if (!title.value || !description.value) {
    toast.error("All fields are required");
    return;
  }

  const task: Task = {
    title: title.value,
    description: description.value,
  };
  await createTask(task);

  toast.success("Task created");

  title.value = "";
  description.value = "";
};
</script>

<template>
  <div class="col-md-4 offset-4">
    <div class="card card-body">
      <h1 class="card-title my-3 text-center">Create a Task</h1>
      <form @submit.prevent="saveTask">
        <input
          class="form-control mb-3"
          placeholder="Write a title"
          type="title"
          v-model="title"
          autofocus
        />
        <textarea
          class="form-control mb-3"
          placeholder="Write a Description"
          rows="3"
          v-model="description"
        ></textarea>
        <button class="btn btn-primary w-100">save</button>
      </form>
    </div>
  </div>
</template>
