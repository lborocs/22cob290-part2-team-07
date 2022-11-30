<script setup lang="ts">
import { Icon } from "@iconify/vue"
const { fix = false } = defineProps<{
	icon: string
	fix?: boolean
}>()
</script>

<template>
	<button :class="{ fix: fix }">
		<span id="slot"><slot /></span> <Icon :icon="icon" />
	</button>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "~/assets/mobile";

button {
	@extend %flex-row, %flex-centre;
	cursor: pointer;
	background-color: var(--colour-accent);
	border: none;
	margin: 0.1rem 0.5rem;
	padding: 0.2rem 0.8rem;
	// width: max-content;
	transition: {
		property: color, background-color;
		duration: 0.1s;
		timing-function: ease-in-out;
	}

	border-radius: 0.5rem;
	font-size: 1.5em;
	#slot {
		margin: 0 0.2rem;
		font-weight: bold;
	}

	box-shadow: var(--card-shadow);
	color: var(--colour-background-1);

	&:hover,
	&:focus {
		outline-offset: 0.3rem;
		background-color: var(--colour-highlight);
		color: var(--colour-accent);
	}

	@media (max-width: mobile.$width) {
		&:not(.fix) {
			aspect-ratio: 1;
			border-radius: 50%;
			font-size: 2em;
			#slot {
				display: none;
			}
		}
	}
}
</style>
