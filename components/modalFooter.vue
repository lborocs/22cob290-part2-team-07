<script setup lang="ts"></script>

<template>
	<footer><slot /></footer>
</template>

<style scoped lang="scss">
@use "~/assets/core";

footer {
	@extend %flex-row, %flex-centre;
	margin-top: 1rem;
	justify-content: flex-end;
}
</style>
