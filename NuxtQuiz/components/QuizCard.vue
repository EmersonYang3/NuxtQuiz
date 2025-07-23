<template>
  <div
    class="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-xl w-full overflow-hidden shadow-2xl cursor-pointer hover:scale-[1.02] hover:shadow-3xl transition-all duration-300 transform active:scale-[0.99] select-none group h-full flex flex-col"
    @click="handleSelect"
    @mouseenter="handleHover"
  >
    <div class="flex flex-col h-full">
      <div class="h-48 relative overflow-hidden shrink-0">
        <img
          :src="quiz.imageUrl || '/placeholder.svg'"
          alt="Quiz image"
          class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          draggable="false"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        />
      </div>

      <div class="p-4 flex flex-col justify-between flex-grow">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <h2
              class="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 flex-grow"
            >
              {{ quiz.title }}
            </h2>
            <span
              :class="[
                'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shrink-0',
                getDifficultyClasses(quiz.difficulty),
              ]"
            >
              {{ getDifficultyText(quiz.difficulty) }}
            </span>
          </div>

          <p
            class="text-zinc-300 text-sm leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors duration-300"
          >
            {{ quiz.description }}
          </p>
        </div>

        <div class="flex flex-wrap gap-1.5 mt-4">
          <span
            v-for="(tag, index) in quiz.subject_tags.slice(0, 3)"
            :key="index"
            class="inline-flex items-center rounded-md bg-zinc-800/50 px-2 py-0.5 text-xs font-medium text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors duration-200"
          >
            {{ tag }}
          </span>
          <span
            v-if="quiz.subject_tags.length > 3"
            class="inline-flex items-center rounded-md bg-zinc-800/50 px-2 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-700/50"
          >
            +{{ quiz.subject_tags.length - 3 }}
          </span>
        </div>
      </div>

      <div
        class="h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "select_quiz", quiz_id: number): void }>();

const props = defineProps<{ quiz: Quiz }>();

const difficultyLevels = [
  { Text: "Very Easy", Color: "green-300" },
  { Text: "Easy", Color: "green-200" },
  { Text: "Medium", Color: "orange-300" },
  { Text: "Hard", Color: "red-300" },
  { Text: "MANGO", Color: "purple-300" },
];

function getDifficultyText(difficulty: number): string {
  const level = difficultyLevels[difficulty] || difficultyLevels[0];
  return level.Text;
}

function getDifficultyClasses(difficulty: number): string {
  const level = difficultyLevels[difficulty] || difficultyLevels[0];
  const color = level.Color;

  const colorMap: Record<string, string> = {
    "green-300": "bg-green-300/20 text-green-300 border-green-300/30",
    "green-200": "bg-green-200/20 text-green-200 border-green-200/30",
    "orange-300": "bg-orange-300/20 text-orange-300 border-orange-300/30",
    "red-300": "bg-red-300/20 text-red-300 border-red-300/30",
    "purple-300": "bg-purple-300/20 text-purple-300 border-purple-300/30",
  };

  return colorMap[color] || colorMap["green-300"];
}

function handleSelect() {
  emits("select_quiz", props.quiz.id);
}

function handleHover() {
  const HoverAudio = new Audio("/sfx/site/hover.mp3");
  HoverAudio.play();
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
