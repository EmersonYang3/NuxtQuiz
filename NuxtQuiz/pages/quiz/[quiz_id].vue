<template>
  <p class="text-white">
    {{ quizId }}
  </p>
</template>

<script lang="ts" setup>
import type { Choice, Question, Quiz } from "#imports";
import { Proportions } from "lucide-vue-next";

const route = useRoute();
const quizId = Number(route.params.quiz_id);

const Questons = ref<Question[]>([]);
const Choices = ref<Choice[]>([]);

async function GetQuestions(quizId: number) {
  const { data } = await useFetch<Question[]>(
    `http://127.0.0.1:8000/api/questions/${quizId}/`,
    {}
  );

  return data;
}

const QuizQuestions = await GetQuestions(3);
console.log(QuizQuestions);

onMounted(async () => {});
</script>
