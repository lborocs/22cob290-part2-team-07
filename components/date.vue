<script setup lang="ts">
const { format = "short" } = defineProps<{
	date: DateString
	format?: Intl.DateTimeFormatOptions["dateStyle"]
}>()
</script>

<template>
	<span>{{
		new Date(date).toLocaleDateString(undefined, {
			dateStyle: format,
		})
	}}</span>
</template>

<style scoped lang="scss"></style>
