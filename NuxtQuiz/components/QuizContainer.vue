<template>
  <div class="min-h-screen bg-black flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-6xl">
      <div
        v-if="filteredQuizzes.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <QuizCard
          v-for="quiz in filteredQuizzes"
          :key="quiz.id"
          :quiz="quiz"
          @select_quiz="handleSelect"
        />
      </div>

      <div v-else class="text-center py-16">
        <div
          class="bg-zinc-900/50 rounded-xl p-8 border border-zinc-800/50 max-w-md mx-auto"
        >
          <svg
            class="w-16 h-16 text-zinc-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">
            No quizzes found
          </h3>
          <p class="text-zinc-400 mb-4">
            {{
              searchfilter.trim()
                ? "Try adjusting your search terms"
                : "No quizzes are available at the moment"
            }}
          </p>
          <button
            v-if="searchfilter.trim()"
            @click="$emit('clear-search')"
            class="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Clear search
          </button>
        </div>
      </div>
    </div>

    <div v-if="!quizzes" class="text-center py-16">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"
      ></div>
      <p class="text-zinc-400">Loading quizzes...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";

const router = useRouter();

const props = defineProps<{ searchfilter: string }>();

const emits = defineEmits<{ (e: "clear-search"): void }>();

const { data: quizzes } = await useFetch<Quiz[]>(
  "http://127.0.0.1:8000/api/quizzes/"
);

const filteredQuizzes = computed(() => {
  if (!quizzes.value) return [];

  const search = props.searchfilter.trim();
  if (!search) return quizzes.value;

  const fuse = new Fuse(quizzes.value, {
    keys: ["title", "description", "subject_tags"],
    threshold: 0.4,
  });

  const results = fuse.search(search);
  return results.map((result) => result.item);
});

function handleSelect(quiz_id: number) {
  router.push({
    name: "quiz-quiz_id",
    params: { quiz_id },
  });
}
</script>
