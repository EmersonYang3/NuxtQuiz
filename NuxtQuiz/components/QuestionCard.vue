<template>
  <div class="question-card bg-white p-4 rounded shadow mb-6">
    <h1 class="text-xl font-bold mb-4">{{ props.question.text }}</h1>
    <ul>
      <li
        v-for="(choice, index) in props.choices"
        :key="index"
        :class="[
          'p-2 border rounded mb-2',
          selected === choice ? 'bg-blue-100' : 'hover:bg-gray-100',
          submitted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ]"
        @click="!submitted && selectChoice(choice)"
      >
        {{ choice.text }}
        <span v-if="showAnswers && choice.correct" class="ml-2 text-green-500"
          >✓</span
        >
      </li>
    </ul>
    <button
      class="bg-red-400 text-white px-4 py-2 mt-4 rounded disabled:opacity-50 cursor-pointer"
      :disabled="!selected"
      @click="handleSubmit"
    >
      Submit
    </button>
    <button
      class="bg-blue-400 text-white px-4 py-2 mt-4 rounded disabled:opacity-50 cursor-pointer ml-5"
      :disabled="!submitted"
      @click="handleNext"
    >
      Next Question
    </button>
  </div>
</template>

<script setup lang="ts">
const showAnswers = ref(false);
const submitted = ref(false);
import type { Question, Choice } from "#imports";
const props = defineProps<{
  question: Question;
  choices: Choice[];
  selectedChoice?: Choice | null;
}>();

const emit = defineEmits<{
  (e: "next-question"): void;
}>();

const selected = ref<Choice | null>(props.selectedChoice ?? null);
function selectChoice(choice: Choice) {
  selected.value = choice;
}

function handleSubmit() {
  if (selected.value) {
    showAnswers.value = true;
    submitted.value = true;
  }
}

function handleNext() {
  showAnswers.value = false;
  submitted.value = false;
  emit("next-question");
}
</script>
