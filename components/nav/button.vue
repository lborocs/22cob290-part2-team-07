<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { RouteLocationRaw } from "vue-router"

defineProps<{
	location: RouteLocationRaw
	name: string
	icon: string
}>()
</script>

<template>
	<NuxtLink :to="location">
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
	transition: background-color animation.$transition-short;

	padding: 0.2rem;
	border-radius: 0.4rem;

	&:hover {
		color: var(--colour-text);
		text-decoration: underline;
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
