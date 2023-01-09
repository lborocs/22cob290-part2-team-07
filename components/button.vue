<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue"

const { fix = false, type = "button" } = defineProps<{
	icon: string
	fix?: boolean
	type?: ButtonHTMLAttributes["type"]
}>()
</script>

<template>
	<button :type="type" class="btn" :class="{ fix: fix }">
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
