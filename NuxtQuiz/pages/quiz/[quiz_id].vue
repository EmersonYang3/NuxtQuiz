<template>
  <div>
    <QuestionContainer :quiz-id="quizId" />
  </div>
</template>

<script lang="ts" setup>
import type { Choice, Question, Quiz } from "../../utils/types";

const route = useRoute();
const quizId = Number(route.params.quiz_id);

const Questons = ref<Question[]>([]);
const Choices = ref<Choice[]>([]);

async function GetQuestions(quizId: number) {}
async function GetChoices(questionId: number) {}

onMounted(async () => {});
</script>
