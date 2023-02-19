<script setup lang="ts">
defineProps<{
	text: boolean
	title: string
}>()
</script>

<template>
	<div class="card-project flex-col">
		<h2 class="card-project-title">{{ title }}</h2>
		<div
			class="flex-col centre card-project-body"
			:class="{ 'card-project-text': text }"
		>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.card-project {
	@extend %card;
	width: 100%;
	max-width: 37ch;
	margin: 0.5rem;
	min-height: 37ch;

	&-text {
		font-size: 1.75rem;
		font-weight: 500;
	}

	&-title {
		margin: 0;
		text-align: center;
	}

	&-body {
		margin: 1rem 0 0 0; // top right bottom left
		flex-grow: 2;
	}
}

.flex-col {
	@extend %flex-col;
}

.centre {
	@extend %flex-centre;
	text-align: center;
}
</style>
