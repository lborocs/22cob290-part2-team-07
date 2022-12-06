<script setup lang="ts">
definePageMeta({
	name: "Dashboard",
})
const { data: tasks } = useFetch("/api/tasks", { default: () => [] as Task[] })
</script>

<template>
	<TaskSwitcher :tasks="tasks!" />
</template>

<style scoped lang="scss"></style>
