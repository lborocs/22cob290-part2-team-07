<script setup lang="ts">
defineProps<{}>()
</script>

<template>
	<div class="card flex-col flex-centre">
		<header>
			<slot name="title">Card title</slot>
		</header>
		<main class="flex-col flex-centre">
			<slot name="largeContent"></slot>

			<slot name="smallText"> small text</slot>
		</main>
		<footer>
			<slot name="footerText">Footer text</slot>
		</footer>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
</style>
