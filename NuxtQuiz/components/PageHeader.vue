<template>
  <nav
    class="sticky top-0 z-50 flex h-16 bg-black border-b border-b-gray-700 pl-3"
  >
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
