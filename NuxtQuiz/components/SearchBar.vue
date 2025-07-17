<template>
  <div class="bg-black pt-[15px]">
    <div class="relative w-full max-w-md mx-auto">
      <input
        v-model="query"
        type="search"
        name="search"
        placeholder="Search"
        class="bg-zinc-900 h-12 px-6 pr-12 pl-12 rounded-md text-sm text-gray-200 placeholder-gray-500 border border-zinc-800 shadow-lg transition duration-300 ease-in-out w-full hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:shadow-lg focus:shadow-purple-500/50"
      />
      <SearchIcon
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search as SearchIcon } from "lucide-vue-next";

const emits = defineEmits<{ (e: "search_query", query: string): void }>();

const query = ref("");

watch(query, (value) => {
  emits("search_query", value);
});
</script>
