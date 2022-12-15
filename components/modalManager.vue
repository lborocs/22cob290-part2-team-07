<script setup lang="ts"></script>

<template>
	<div id="dialogues"></div>
</template>

<style lang="scss">
@use "~/assets/mobile";
#dialogues {
	> dialog {
		margin: auto;
		@media (min-width: mobile.$width) {
			transform: translate(calc(var(--nav-width) / 2), 0);
		}
	}
}
</style>
