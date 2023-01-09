<script setup lang="ts">
const { query } = defineProps<{
	query: string
}>()

const emit = defineEmits<{
	(e: "update:query", query: string): any
}>()
</script>

<template>
	<input
		type="search"
		name="asset"
		placeholder="Search for an Asset..."
		:value="query"
		@input="$emit('update:query', ($event.target as HTMLInputElement).value)"
	/>
</template>

<style scoped lang="scss">
@use "~/assets/core";

input {
	@extend %input;
}
</style>
