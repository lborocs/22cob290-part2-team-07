<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"

const { fix = false } = defineProps<{
	to: RouteLocationRaw
	icon: string
	fix?: boolean
}>()
</script>

<template>
	<NuxtLink :to="to">
		<Button :icon="icon" :fix="fix">
			<slot />
		</Button>
	</NuxtLink>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";
a {
	color: var(--colour-background-1);
	text-decoration: none;
}
button {
	font-size: inherit;
	@media (max-width: mobile.$width) {
		&:not(.fix) {
			font-size: 1.5em;
		}
	}
}
</style>
