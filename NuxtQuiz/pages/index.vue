<template>
  <div>
    <SearchBar @search_query="handleSearchQuery" />
    <QuizContainer :searchfilter="searchfilter" class="mt-8" />
  </div>
</template>

<script lang="ts" setup>
const searchfilter = ref("");

function handleSearchQuery(query: string) {
  searchfilter.value = query;
}
</script>
