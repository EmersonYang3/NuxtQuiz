<template>
  <div>
    <QuestionCard
      v-if="choices.length > 0"
      :question="currentQuestion"
      :choices="choices"
      @next-question="HandleNext"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ questions: Question[] }>();

const currentQuestionIndex = ref(0);
const choices = ref<Choice[]>([]);

const currentQuestion = computed(() => {
  return props.questions[currentQuestionIndex.value] || null;
});

async function fetchChoicesForCurrent() {
  if (!currentQuestion.value) {
    choices.value = [];
    return;
  }

  const questionId = currentQuestion.value.id;
  const { data, error } = await useFetch<Choice[]>(
    `http://127.0.0.1:8000/api/choices/${questionId}/`
  );

  console.log(data);

  if (error.value) {
    console.error("Error loading choices:", error.value);
    choices.value = [];
  } else {
    choices.value = data.value || [];
  }
}

async function HandleNext() {
  currentQuestionIndex.value += 1;
  await fetchChoicesForCurrent();
}

onMounted(fetchChoicesForCurrent);
watch(currentQuestionIndex, fetchChoicesForCurrent);
watch(
  async () => props.questions,
  async (newVal) => {
    await fetchChoicesForCurrent();
  },
  { immediate: true }
);
</script>
