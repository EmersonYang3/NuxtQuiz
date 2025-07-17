<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <QuizCard />
      <!-- Add for -->
      />
    </div>
  </div>
</template>

<script setup>
import QuizCard from "./QuizCard.vue";

const questions = [
  {
    questionText: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid"],
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter"],
  },
];
</script>
