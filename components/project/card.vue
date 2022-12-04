<script setup lang="ts">
import { extend } from "@vue/shared"

defineProps<{
	text: boolean
	title: string
}>()
</script>

<template>
	<div class="card-project flex-col">
		<h3 class="card-project-title">{{ title }}</h3>
		<div
			class="flex-col centre card-project-body"
			:class="{ 'card-project-text': text }"
		>
			<slot name="largeContent"></slot>

			<slot name="smallText"></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

.card-project {
	@extend .card;
	width: 100%;
	max-width: 40ch;
	margin: 0.5rem;
	padding: 1rem;

	&-text {
		font-size: 1.75rem;
		font-weight: 500;
	}

	&-title {
		margin: 0;
		text-align: center;
	}

	&-body {
		margin: 1rem auto;
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
