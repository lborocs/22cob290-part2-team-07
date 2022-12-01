<script setup lang="ts">
definePageMeta({
	name: "Dashboard",
})
const taskArr: Task[] = []
const tasks = ref(taskArr)
const getTasks = async () => {
	const res = await fetch("http://localhost:3000/api/tasks")
	const data = await res.json()
	tasks.value = data
}
await getTasks()
</script>

<template>
	<p>The home dashboard</p>
	<KanbanBoard :tasks="tasks" />
</template>

<style scoped lang="scss"></style>
