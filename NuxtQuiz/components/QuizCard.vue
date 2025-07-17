<template>
  <div
    class="bg-gray-900 text-white rounded-md w-full max-w-3xl flex overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300 transform active:scale-[0.98] select-none flex-row items-center gap-4"
    @click="handleSelect"
  >
    <div class="w-1/6">
      <img
        :src="props.quiz.imageUrl"
        alt="Quiz image"
        class="object-cover w-full h-full"
        draggable="false"
      />
    </div>

    <div class="w-5/6 flex flex-col justify-between p-6">
      <h2 class="text-2xl font-bold mb-4">
        {{ props.quiz.title }}
      </h2>
      <p>
        {{ props.quiz.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Quiz } from "../utils/types";

const emits = defineEmits<{ (e: "select_quiz", quiz_id: number): void }>();
const props = defineProps<{ quiz: Quiz }>();

function handleSelect() {
  emits("select_quiz", props.quiz.id);
}

console.log(props.quiz);
</script>

<style scoped>
img {
  -webkit-user-drag: none;
}
</style>
