<template>
  <div>
    <QuestionsContainer :questions="Questions" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const quizId = Number(route.params.quiz_id);

const Questions = ref<Question[]>([]);

onMounted(async () => {
  const { data: fetchedQuestions, error } = await useFetch<Question[]>(
    `http://127.0.0.1:8000/api/questions/${quizId}/`
  );

  if (error.value) {
    console.error("Failed to load questions:", error.value);
    return;
  }

  if (fetchedQuestions.value) {
    Questions.value = fetchedQuestions.value;
  }
});
</script>
