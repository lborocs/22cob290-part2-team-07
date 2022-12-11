<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>

<template>
	<header>
		<h1><u>Make-It-All</u> Portal</h1>
		<!-- will fix positioning-->
		<img src="~/assets/tools.svg" alt="Make-It-All Logo" class="logo" />
	</header>
	<body>
		<svg viewBox="1 1 1651 480">
			<path
				d="M 1 901 L 1651 901 C 2120 81 371 396 1 1"
				stroke="var(--colour-accent)"
				fill="var(--colour-accent)"
			/>
		</svg>
	</body>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";
@use "~/assets/core";
@use "~/assets/animation";

body {
	overflow: hidden;
}

header {
	display: flex;
	align-content: flex-start;
	padding-left: 2rem;
	padding-top: 2rem;
}

h1 {
	font-size: 1.5rem;
}

h1 u {
	font-size: 2rem;
	color: var(--colour-accent);
}

.logo {
	width: 5rem;
}

svg {
	margin: 0;
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
