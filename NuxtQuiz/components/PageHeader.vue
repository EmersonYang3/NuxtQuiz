<template>
  <nav class="flex sticky h-16 border-b border-b-gray-700 pl-3">
    <button
      class="font-bold text-white text-2xl cursor-pointer"
      @click="goHome"
    >
      67Quizzes
    </button>
  </nav>
</template>

<script lang="ts" setup>
const router = useRouter();

function goHome() {
  router.push("/");
}
</script>
