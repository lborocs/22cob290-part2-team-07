<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { RouteLocationRaw } from "vue-router"

defineProps<{
	location: RouteLocationRaw
	name: string
	icon: string
}>()

const emit = defineEmits<{
	(e: "navigate"): void
}>()
</script>

<template>
	<NuxtLink :to="location" @click.prevent="$emit('navigate')">
		<Icon :icon="icon" />
		<span class="nav-label">{{ name }}</span>
	</NuxtLink>
</template>

<style scoped lang="scss">
@use "assets/animation";

a {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	text-decoration: none;
	color: var(--colour-text);
	transition: background-color animation.$transition-short ease-in-out;

	padding: 0.2rem;
	border-radius: 0.4rem;

	&:hover {
		color: var(--colour-text);
		.nav-label {
			position: relative;

			&::after {
				content: "";
				position: absolute;
				bottom: -0.05rem;
				left: 0;
				width: 100%;
				height: 0.11rem;
				border-radius: 0.4rem;
				background-color: currentColor;
			}
		}
	}

	.iconify {
		font-size: 2.25rem;
		min-width: 2.25rem;
	}

	&.router-link-active {
		background-color: var(--colour-background-1);
		color: var(--colour-text);
	}
}
</style>
