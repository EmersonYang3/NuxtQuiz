<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { data, pending, error, refresh }: any = await useFetch(
  "http://127.0.0.1:8000/api/quiz/1",
  {}
);

console.log("yeah");
console.log(data.value);
console.log("after");
</script>
