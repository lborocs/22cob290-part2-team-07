<script setup lang="ts">
import { extend } from "@vue/shared"

defineProps<{
	text: boolean
}>()
</script>

<template>
	<div class="card-small flex-col centre" :class="{ 'card-text': text }">
		<slot name="title"> </slot>
		<main class="flex-col">
			<slot name="largeContent"></slot>

			<slot name="smallText"></slot>
		</main>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

.card {
	@extend .card;

	width: 100%;
	max-width: 30ch;
	height: 100%;

	&-text {
		font-size: 1.5em;
		font-weight: 500;
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
