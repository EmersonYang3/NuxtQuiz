<template>
  <div>
    <SearchBar @search_query="handleSearchQuery" />
    <QuizContainer
      class="mt-8"
      :searchfilter="searchfilter"
      @clear-search="handleClearSearch"
    />
  </div>
</template>

<script lang="ts" setup>
const searchfilter = ref("");

function handleSearchQuery(query: string) {
  searchfilter.value = query;
}

function handleClearSearch() {
  searchfilter.value = "";
}
</script>
