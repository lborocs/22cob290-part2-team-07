<script setup lang="ts"></script>

<template>
	<svg viewBox="1 1 1651 480">
		<path
			d="M 1 901 L 1651 901 C 2120 81 371 396 1 1"
			stroke="var(--colour-accent)"
			fill="var(--colour-accent)"
		/>
	</svg>
</template>

<style scoped lang="scss">
svg {
	margin: auto;
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;
	left: -1px;
	top: 0px;
	background: var(--colour-block);
	border: 1px solid var(--colour-block);
	backdrop-filter: blur(2px);
	z-index: -1;
}
</style>
