<template></template>

<script lang="ts" setup>
import type { Question } from "#imports";

const currentQuestionIndex = ref(0);
const props = defineProps<{ questions: Question[] }>();

console.log(props.questions);
</script>
