<script setup lang="ts">
definePageMeta({
	name: "dev",
	layout: false,
})

let activeProcesses = $ref(0)
const disable = $computed(() => activeProcesses > 0)

async function refreshDatabase() {
	try {
		activeProcesses++
		await useLazyFetch("/api/faux?refresh")
	} finally {
		activeProcesses--
	}
}
</script>

<template>
	<ButtonNuxt icon="material-symbols:flight" to="/dashboard" :disabled="disable"
		>Go To Dashboard</ButtonNuxt
	>
	<Button
		icon="material-symbols:refresh-rounded"
		:fix="true"
		@click="refreshDatabase"
		:disabled="disable"
		>Refresh Database</Button
	>
</template>

<style scoped lang="scss"></style>
