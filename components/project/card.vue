<script setup lang="ts">
defineProps<{
	title: string
	content: string
}>()
</script>

<template>
	<div class="card-small">
		<h3>{{ title }}</h3>
		<div class="flex-col-center">
			<p>{{ content }}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
:root {
	--colour-highlight: #fff;
	--card-small-radius: 14px;
	--card-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
}

.card-small {
	width: 100%;
	max-width: 30ch;
	margin: 0.5rem;
	background-color: var(--colour-highlight);
	padding: 1rem;
	border-radius: var(--card-small-radius);
	box-shadow: var(--card-shadow);
}

.flex-col-center {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
</style>
