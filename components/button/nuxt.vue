<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"

const { fix = false } = defineProps<{
	to: RouteLocationRaw
	icon: string
	fix?: boolean
}>()
</script>

<template>
	<NuxtLink :to="to" class="btn" :class="{ fix: fix }">
		<ButtonBase :icon="icon">
			<slot />
		</ButtonBase>
	</NuxtLink>
</template>

<style scoped lang="scss">
@use "~/assets/button";
a {
	text-decoration: none;
}
</style>

<style lang="scss">
@use "~/assets/button";

a.btn {
	@extend %button;
}
</style>
