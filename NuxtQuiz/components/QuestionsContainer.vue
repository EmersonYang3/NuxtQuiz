<template>
  <div>
    <QuestionCard
      v-if="currentQuestion"
      :question="currentQuestion"
      :choices="currentChoices"
      @answer-selected="handleAnswer"
    />
    <button @click="loadNextQuestion">Next</button>
  </div>
</template>
<script lang="ts">
function handleAnswer() {}

function loadNextQuestion() {}
//question # management
const currentQuestion = ref(null);
const currentChoices = ref([]);

//fetch api
async function loadQuestion(questionId: number) {
  const [q, c] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/questions/${questionId}`),
    fetch(`http://127.0.0.1:8000/api/choices/${questionId}`),
  ]);
  currentQuestion.value = await q.json();
  currentChoices.value = await c.json();
}
</script>
