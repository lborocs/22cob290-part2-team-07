<template>
	<div class="card-small rag-band">
		<h3>{{ props.task.title }}</h3>
	</div>
</template>

<style scoped lang="scss"></style>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})
</script>
