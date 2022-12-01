<script setup lang="ts">
definePageMeta({
	name: "Dashboard",
})
const { data: tasks } = useFetch("/api/tasks", { default: () => [] as Task[] })
</script>

<template>
	<p>The home dashboard</p>
	<KanbanBoard :tasks="tasks!" />
</template>

<style scoped lang="scss"></style>
