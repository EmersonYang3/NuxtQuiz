<template>
  <div class="flex items-center m-4">
    <div class="bg-gray-700 text-white max-w-1/4 rounded-2xl max-y-1/2">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">
          {{ fillerQuestion.questionText }}
        </h2>
        <p class="text-gray-800 mb-4">{{ fillerQuestion.description }}</p>
        <ul class="space-y-2"></ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const fillerQuestion = ref({
  questionText: "67 Quiz",
  description: "This is a sample question for the quiz.",
});
</script>
