<template>
  <div
    class="question-card bg-gradient-to-br from-black to-gray-900 border border-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 mb-8 overflow-hidden"
  >
    <div class="p-6 pb-4">
      <h1 class="text-2xl font-bold text-gray-100 leading-tight mb-6">
        {{ props.question.text }}
      </h1>

      <div
        v-if="props.question.imageUrl"
        class="mb-6 rounded-xl overflow-hidden bg-black border border-gray-800"
      >
        <img
          :src="props.question.imageUrl"
          alt="Question illustration"
          class="w-full h-auto max-h-96 object-contain transition-transform duration-300 hover:scale-105 bg-black"
        />
      </div>
    </div>

    <div class="px-6 pb-6">
      <div class="space-y-3">
        <div
          v-for="(choice, index) in props.choices"
          :key="index"
          :class="[
            'group relative p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer',
            'hover:shadow-xl transform hover:-translate-y-0.5',
            selected === choice
              ? submitted
                ? choice.correct
                  ? 'border-green-500 bg-green-950/50 shadow-xl ring-2 ring-green-500/30 shadow-green-500/20'
                  : 'border-red-500 bg-red-950/50 shadow-xl ring-2 ring-red-500/30 shadow-red-500/20'
                : 'border-purple-500 bg-purple-950/50 shadow-xl ring-2 ring-purple-500/30 shadow-purple-500/20'
              : 'border-gray-800 bg-gray-950 hover:border-gray-700 hover:bg-gray-900',
            submitted ? 'cursor-not-allowed' : '',
            showAnswers && choice.correct && selected !== choice
              ? 'border-green-500 bg-green-950/50 ring-2 ring-green-500/30 shadow-green-500/20'
              : '',
          ]"
          @click="!submitted && selectChoice(choice)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  'w-5 h-5 rounded-full border-2 transition-all duration-200',
                  selected === choice
                    ? submitted
                      ? choice.correct
                        ? 'border-green-400 bg-green-500 shadow-lg shadow-green-500/50'
                        : 'border-red-400 bg-red-500 shadow-lg shadow-red-500/50'
                      : 'border-purple-400 bg-purple-500 shadow-lg shadow-purple-500/50'
                    : 'border-gray-600 group-hover:border-gray-500',
                ]"
              >
                <div
                  v-if="selected === choice"
                  class="w-full h-full rounded-full bg-black scale-50"
                ></div>
              </div>

              <span
                :class="[
                  'text-lg font-medium transition-colors duration-200',
                  selected === choice
                    ? submitted
                      ? choice.correct
                        ? 'text-green-400'
                        : 'text-red-400'
                      : 'text-purple-300'
                    : 'text-gray-300',
                  showAnswers && choice.correct && selected !== choice
                    ? 'text-green-400'
                    : '',
                ]"
              >
                {{ choice.text }}
              </span>
            </div>

            <div
              v-if="submitted && selected === choice"
              :class="[
                'flex items-center justify-center w-8 h-8 text-white rounded-full shadow-xl',
                choice.correct
                  ? 'bg-green-600 shadow-green-500/50 animate-pulse'
                  : 'bg-red-600 shadow-red-500/50',
              ]"
            >
              <svg
                v-if="choice.correct"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <div
              v-else-if="showAnswers && choice.correct"
              class="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full animate-pulse shadow-xl shadow-green-500/50"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6 pt-2 border-t border-gray-800 bg-black/50">
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          :class="[
            'flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform',
            'focus:outline-none focus:ring-4 focus:ring-opacity-50',
            !selected
              ? 'bg-gray-800 cursor-not-allowed text-gray-500'
              : 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-0.5 focus:ring-red-500/50 active:scale-95',
          ]"
          :disabled="!selected"
          @click="handleSubmit"
        >
          <span class="flex items-center justify-center space-x-2">
            <svg
              v-if="!submitted"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>{{ submitted ? "Submitted" : "Submit Answer" }}</span>
          </span>
        </button>

        <button
          :class="[
            'flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform',
            'focus:outline-none focus:ring-4 focus:ring-opacity-50',
            !submitted
              ? 'bg-gray-800 cursor-not-allowed text-gray-500'
              : 'bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-0.5 focus:ring-purple-500/50 active:scale-95',
          ]"
          :disabled="!submitted"
          @click="handleNext"
        >
          <span class="flex items-center justify-center space-x-2">
            <span>Next Question</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Question, Choice } from "#imports";

const showAnswers = ref(false);
const submitted = ref(false);

const props = defineProps<{
  question: Question;
  choices: Choice[];
  selectedChoice?: { text: string; correct: boolean } | null;
}>();

const emit = defineEmits<{
  (e: "next-question"): void;
}>();

const selected = ref<Choice | null>(props.selectedChoice ?? null);

function selectChoice(choice: Choice) {
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
