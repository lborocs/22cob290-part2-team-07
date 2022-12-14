<script setup lang="ts"></script>

<template>
	<div id="dialogues"></div>
</template>

<style lang="scss">
#dialogues {
	> dialog {
		transform: translate(calc(var(--nav-width) / 2), 0);
		margin: auto;
	}
}
</style>
