<template>
  <div class = "question-card bg-white">
    <h1>{{ question.title }}</h1>
    <ul>
        <li 
        v-for="(choice, choiceId) in question.choices" 
        :key="choiceId"
        class="p-2 border mb-2 cursor-pointer hover:bg-gray-100"
      >
        {{ choice.text }}
        <span v-if="choice.correct" class="ml-2 text-green-500">✓</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang ="ts">

// Filler question
  const question = {
    title:"Mango",
    choices:{
      1:{
        text:"Sigma",
        correct:true,
      },
      2:{
        text:"Ohio",
        correct:false,
      },
      3:{
        text:"Jimmy",
        correct:false,
      }
    }
  }

  import type {Question, Choice} from "../utils/types";
  const { data: Question } = await useFetch<Quiz[]>(
  "http://127.0.0.1:8000/api/quizzes/"
);
</script>

