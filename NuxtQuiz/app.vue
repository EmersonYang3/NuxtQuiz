<template>
<<<<<<< HEAD
  <div>
    <NuxtRouteAnnouncer />
    <SearchBar />
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
=======
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
>>>>>>> d7b497b36af62b67798ae6cf3c5a4597edffc8bc
