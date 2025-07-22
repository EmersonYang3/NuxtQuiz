<template>
  <div>
    <QuestionCard v-for=""></QuestionCard>
  </div>
</template>
<script lang="ts">
import type { Question, Choice } from "../utils/types";

const { data: question } = await useFetch<Quiz[]>(
  "http://127.0.0.1:8000/api/quizzes/${quiz_id}"
);
</script>
