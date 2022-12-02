<script setup lang="ts">
import { extend } from "@vue/shared"

defineProps<{}>()
</script>

<template>
	<div class="card flex-col centre">
		<header>
			<slot name="title">Card title</slot>
		</header>
		<main class="flex-col centre">
			<slot name="largeContent"></slot>

			<slot name="smallText"> small text</slot>
		</main>
		<footer>
			<slot name="footerText">Footer text</slot>
		</footer>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;

.flex-col {
	@extend %flex-col;
}

.centre {
	@extend %flex-centre;
}
</style>
