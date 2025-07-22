<template>
  <!-- Overlay -->
  <div
    v-if="isPlayingSFX"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <img
      src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84154660ce423813757609aba4"
      alt="Overlay Image"
      class="w-48 h-48 object-contain"
    />
  </div>

  <!-- Main Question UI -->
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
import { ref } from "vue";
import SFXReferences from "../data/SFXReferences.json";
import DifficultyData from "../data/DifficultyData.json";

// Define reactive state
const showAnswers = ref(false);
const submitted = ref(false);
const isPlayingSFX = ref(false);

const props = defineProps<{
  question: Question;
  choices: Choice[];
  selectedChoice?: { text: string; correct: boolean } | null;
}>();

const emit = defineEmits<{
  (e: "next-question"): void;
}>();

const selected = ref(props.selectedChoice ?? null);

// Choice selection
function selectChoice(choice: { text: string; correct: boolean }) {
  selected.value = choice;
}

// Handle submit and play audio with overlay
async function handleSubmit() {
  if (!selected.value) return;

  showAnswers.value = true;
  submitted.value = true;

  const isCorrect = selected.value.correct;
  const difficultyText = DifficultyData[props.question.difficulty - 1]
    .Text as keyof typeof SFXReferences.Correct;

  const sfxCategory = isCorrect
    ? SFXReferences.Correct
    : SFXReferences.Incorrect;
  const sfxReference = sfxCategory[difficultyText];

  const audio = new Audio(sfxReference);
  isPlayingSFX.value = true;

  await new Promise<void>((resolve) => {
    audio.addEventListener("ended", () => {
      isPlayingSFX.value = false;
      resolve();
    });
    audio.play();
  });
}

// Next question logic
function handleNext() {
  showAnswers.value = false;
  submitted.value = false;
  selected.value = null;
  emit("next-question");
}
</script>
