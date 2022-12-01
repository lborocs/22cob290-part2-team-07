<script setup lang="ts">
definePageMeta({
	name: "Dashboard",
})
const tasks = ref<Task[]>([])
$fetch("/api/tasks").then(values => (tasks.value = values))
</script>

<template>
	<p>The home dashboard</p>
	<KanbanBoard :tasks="tasks" />
</template>

<style scoped lang="scss"></style>
