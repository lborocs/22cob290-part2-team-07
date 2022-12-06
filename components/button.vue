<script setup lang="ts">
const { fix = false } = defineProps<{
	icon: string
	fix?: boolean
}>()
</script>

<template>
	<button class="btn" :class="{ fix: fix }">
		<ButtonBase :icon="icon"><slot /></ButtonBase>
	</button>
</template>

<style lang="scss">
@use "~/assets/button";
button.btn {
	@extend %button;
	font-family: inherit;
}
</style>
