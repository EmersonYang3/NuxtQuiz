<template>
  <div class="min-h-screen bg-black flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <QuizCard
        v-for="quiz in filteredQuizzes"
        :quiz="quiz"
        @select_quiz="handleSelect"
      />
    </div>
    <p class="text-white">{{ filteredQuizzes }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Quiz } from "#imports";
import Fuse from "fuse.js";

const router = useRouter();

const props = defineProps<{ searchfilter: string }>();

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

  console.log(quizzes);

  const results = fuse.search(search);
  return results.map((result) => result.item);
});

function handleSelect(quiz_id: number) {
  console.log(quiz_id);
  router.push({
    name: "quiz-quiz_id",
    params: { quiz_id },
  });
}
</script>
