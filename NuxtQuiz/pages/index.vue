<template>
  <SearchBar @search_query="handleSearchQuery" />
  <QuizContainer :searchfilter="searchfilter" />
</template>

<script lang="ts" setup>
const searchfilter = ref("");

function handleSearchQuery(query: string) {
  searchfilter.value = query;
}
</script>
