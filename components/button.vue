<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue"

const {
	fix = false,
	type = "button",
	disabled = false,
} = defineProps<{
	icon: string
	fix?: boolean
	type?: ButtonHTMLAttributes["type"]
	disabled?: boolean
}>()
</script>

<template>
	<button
		:disabled="disabled ?? false"
		:type="type"
		class="btn"
		:class="{ fix: fix }"
	>
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
