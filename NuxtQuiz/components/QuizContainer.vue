<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <QuizCard
        v-for="(title, description, imageUrl) in Quizzes"
        :key="id"
        :title="title"
        :description="description"
        :ImageUrl="imageUrl"
      />
    </div>
  </div>
</template>

<script setup></script>
