<template>
  <div
    class="bg-gray-900 text-white rounded-md w-full max-w-3xl flex overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300 transform active:scale-[0.98] select-none flex-row items-center gap-4"
  >
    <div class="w-1/6">
      <img
        :src="fillerQuiz.imageURL"
        alt="Quiz image"
        class="object-cover w-full h-full"
        draggable="false"
      />
    </div>

    <div class="w-5/6 flex flex-col justify-between p-6">
      <h2 class="text-2xl font-bold mb-4">
        {{ fillerQuiz.questionText }}
      </h2>
      <p>
        {{ fillerQuiz.questionDescription }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const fillerQuiz = ref({
  questionText: "67 Quiz",
  questionDescription:
    "This is a filler quiz to demonstrate the layout. It has no real questions or answers.",
  imageURL:
    "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b",
});
</script>

<style scoped>
img {
  -webkit-user-drag: none;
}
</style>
