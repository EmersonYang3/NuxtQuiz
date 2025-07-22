<template>
  <div
    class="bg-slate-900 text-white rounded-md w-full max-w-3xl flex overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300 transform active:scale-[0.98] select-none flex-row items-center gap-4"
    @click="handleSelect"
    @mouseenter="handleHover"
  >
    <div class="w-1/6 m-2 ml-8">
      <img
        :src="props.quiz.imageUrl"
        alt="Quiz image"
        class="object-cover w-full h-full rounded-md"
        draggable="false"
      />
    </div>

    <div class="w-5/6 flex flex-col justify-between py-4">
      <h2 class="text-2xl font-bold mb-2">
        {{ props.quiz.title }}
      </h2>
      <p>
        {{ props.quiz.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Quiz } from "#imports";
import SFXReferences from "../data/SFXReferences.json";

const emits = defineEmits<{ (e: "select_quiz", quiz_id: number): void }>();
const props = defineProps<{ quiz: Quiz }>();

function handleSelect() {
  const AudioReference = SFXReferences.Correct.MANGO;
  const NewAudio = new Audio(AudioReference);
  NewAudio.play();

  emits("select_quiz", props.quiz.id);
}

function handleHover() {
  const HoverAudio = new Audio("/sfx/site/hover.mp3");
  HoverAudio.play();
}
</script>
