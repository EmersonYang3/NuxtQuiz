<template>
  <div class="question-card bg-white p-4 rounded shadow mb-6">
    <h1 class="text-xl font-bold mb-4">{{ props.question.text }}</h1>
    <ul>
      <li v-for="(choice, index) in props.choices" :key="index">
        {{ choice.text }}
        <span v-if="showAnswers && choice.correct" class="ml-2 text-green-500"
          >✓</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Question, Choice } from "#imports";

const props = defineProps<{
  question: Question;
  choices: Choice[];
  showAnswers?: boolean;
  selectedChoice?: Choice | null;
}>();

defineEmits<{
  (e: "answer-selected", choice: Choice): void;
}>();
</script>
