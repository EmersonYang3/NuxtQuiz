<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const SubjectTags = ["Math", "Reading", "History", "BrainRot", "OGBrainRot"];
const DifficultyTags = ["Very Easy", "Easy", "Medium", "Hard", "MANGO"];

const selected = ref<string[]>([]);
const containerRef = ref<HTMLElement | null>(null);

const emits = defineEmits(["FilterListChange"]);

function toggleSubectTag(SubjectTag: string) {
  if (selected.value.includes(SubjectTag)) {
    selected.value = selected.value.filter((c) => c !== SubjectTag);
  } else {
    selected.value.push(SubjectTag);
  }

  console.log(selected.value);
  emits("FilterListChange", selected.value);
}

onMounted(() => {
  if (containerRef.value) {
    gsap.from(containerRef.value.children, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.out",
    });
  }
});
</script>

<template>
  <div class="min-h-screen bg-black p-6 pt-40">
    <!-- h1 class="text-white text-3xl font-semibold mb-12 text-center">
      Filter quizzes by subject tags...
    </h1 -->
    <div class="max-w-[570px] mx-auto">
      <div ref="containerRef" class="flex flex-wrap gap-3">
        <button
          v-for="SubjectTag in SubjectTags"
          :key="SubjectTag"
          @click="toggleSubectTag(SubjectTag)"
          class="inline-flex items-center px-4 py-2 rounded-full text-base font-medium whitespace-nowrap overflow-hidden ring-1 ring-inset transition-colors duration-200 cursor-pointer"
          :class="
            selected.includes(SubjectTag)
              ? 'bg-[rgba(168,85,247,0.3)] text-[#a855f7] ring-[rgba(168,85,247,0.3)]'
              : 'bg-[rgba(39,39,42,0.5)] text-zinc-400 ring-[hsla(0,0%,100%,0.06)]'
          "
        >
          {{ SubjectTag }}
        </button>
      </div>
    </div>
  </div>
</template>
