<template>
  <div class="question-card bg-white p-4 rounded shadow">
    <h1 class="text-xl font-bold mb-4">{{ question.text }}</h1>

    <ul>
      <li
        v-for="(choice, index) in choices"
        :key="index"
        @click="$emit('answer-selected', choice)"
        class="p-2 border mb-2 cursor-pointer hover:bg-gray-100"
      >
        {{ choice.text }}
        <span v-if="choice.correct" class="ml-2 text-green-500">✓</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Question, Choice } from "../utils/types";

defineProps<{
  question: Question;
  choices: Choice[];
}>();

defineEmits<{
  (e: "answer-selected", choice: Choice): void;
}>();
</script>
