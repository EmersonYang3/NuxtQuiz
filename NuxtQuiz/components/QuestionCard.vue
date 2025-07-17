<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <span
            class="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full"
          >
            Question {{ currentQuestion }} of {{ totalQuestions }}
          </span>
        </div>

        <h2 class="text-2xl font-bold text-white leading-relaxed">
          {{ question.text }}
        </h2>

        <!-- Progress Bar -->
        <div class="mt-6 w-full bg-gray-800 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Answer Choices -->
      <div class="space-y-4 mb-8">
        <button
          v-for="(choice, index) in question.choices"
          :key="index"
          @click="selectAnswer(index)"
          :disabled="selectedAnswer !== null"
          :class="getChoiceClasses(index)"
          class="w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed group"
        >
          <div class="flex items-center space-x-4">
            <!-- Choice Letter -->
            <div
              :class="getChoiceLetterClasses(index)"
              class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300"
            >
              {{ String.fromCharCode(65 + index) }}
            </div>

            <!-- Choice Text -->
            <span
              :class="getChoiceTextClasses(index)"
              class="flex-1 font-medium transition-colors duration-300"
            >
              {{ choice.text }}
            </span>

            <!-- Result Icon -->
            <div v-if="selectedAnswer !== null" class="flex-shrink-0">
              <CheckCircleIcon
                v-if="index === question.correctAnswer"
                class="w-6 h-6 text-green-400"
              />
              <XCircleIcon
                v-else-if="
                  index === selectedAnswer && index !== question.correctAnswer
                "
                class="w-6 h-6 text-red-400"
              />
            </div>
          </div>
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between">
        <button
          @click="previousQuestion"
          :disabled="currentQuestion === 1"
          class="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div class="flex space-x-3">
          <button
            v-if="selectedAnswer === null"
            @click="skipQuestion"
            class="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>

          <button
            @click="nextQuestion"
            :disabled="selectedAnswer === null && !canSkip"
            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <span>{{ isLastQuestion ? "Finish" : "Next" }}</span>
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Explanation (shown after answer) -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
} from "lucide-vue-next";

// Props
const props = defineProps({
  canSkip: {
    type: Boolean,
    default: true,
  },
});

// Reactive data
const selectedAnswer = ref(null);
const currentQuestion = ref(1);
const totalQuestions = ref(10);

// Sample question data
const question = ref({
  text: "What is the primary benefit of using Vue 3's Composition API over the Options API?",
  choices: [
    { text: "Better performance in all scenarios" },
    { text: "Improved code organization and reusability" },
    { text: "Smaller bundle size" },
    { text: "Automatic TypeScript support" },
  ],
  correctAnswer: 1,
  explanation:
    "The Composition API provides better code organization and reusability by allowing you to group related logic together, making it easier to extract and share logic between components.",
});

// Computed properties
const progress = computed(() =>
  Math.min((currentQuestion.value / totalQuestions.value) * 100, 100)
);
const isLastQuestion = computed(
  () => currentQuestion.value === totalQuestions.value
);

// Methods
const selectAnswer = (index) => {
  if (selectedAnswer.value !== null) return;
  selectedAnswer.value = index;
};

const getChoiceClasses = (index) => {
  const baseClasses = "border-2";

  if (selectedAnswer.value === null) {
    return `${baseClasses} border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-750`;
  }

  if (index === question.value.correctAnswer) {
    return `${baseClasses} border-green-500 bg-green-500/10`;
  }

  if (
    index === selectedAnswer.value &&
    index !== question.value.correctAnswer
  ) {
    return `${baseClasses} border-red-500 bg-red-500/10`;
  }

  return `${baseClasses} border-gray-700 bg-gray-800/50`;
};

const getChoiceLetterClasses = (index) => {
  if (selectedAnswer.value === null) {
    return "bg-gray-700 text-gray-300 group-hover:bg-gray-600";
  }

  if (index === question.value.correctAnswer) {
    return "bg-green-500 text-white";
  }

  if (
    index === selectedAnswer.value &&
    index !== question.value.correctAnswer
  ) {
    return "bg-red-500 text-white";
  }

  return "bg-gray-700 text-gray-400";
};

const getChoiceTextClasses = (index) => {
  if (selectedAnswer.value === null) {
    return "text-gray-200 group-hover:text-white";
  }

  if (index === question.value.correctAnswer) {
    return "text-green-100";
  }

  if (
    index === selectedAnswer.value &&
    index !== question.value.correctAnswer
  ) {
    return "text-red-100";
  }

  return "text-gray-400";
};

const nextQuestion = () => {
  if (selectedAnswer.value === null && !props.canSkip) return;
  if (currentQuestion.value >= totalQuestions.value) return;

  // Reset for next question
  selectedAnswer.value = null;
  currentQuestion.value++;

  // In a real app, you would load the next question here
  console.log("Moving to next question");
};

const previousQuestion = () => {
  if (currentQuestion.value === 1) return;

  selectedAnswer.value = null;
  currentQuestion.value--;

  console.log("Moving to previous question");
};

const skipQuestion = () => {
  if (!props.canSkip) return;
  if (currentQuestion.value >= totalQuestions.value) return;
  nextQuestion();
};
</script>

<style scoped>
/* Custom hover effect for choices */
.group:hover .choice-hover {
  transform: translateX(4px);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
