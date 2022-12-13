<script setup lang="ts">
let activeProcesses = $ref(0)
const disable = $computed(() => activeProcesses > 0)

async function refreshDatabase() {
	activeProcesses++
	await useLazyFetch("/api/faux?refresh")
	activeProcesses--
}
</script>

<template>
	<Button
		icon="material-symbols:refresh-rounded"
		:fix="true"
		@click="refreshDatabase"
		:disabled="disable"
		>Refresh Database</Button
	>
</template>

<style scoped lang="scss"></style>
