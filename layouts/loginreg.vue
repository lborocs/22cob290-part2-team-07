<script setup lang="ts"></script>

<template>
	<header>
		<h1><u>Make-It-All</u> Portal</h1>
		<!-- will fix positioning-->
		<img src="~/assets/tools.svg" alt="Make-It-All Logo" class="logo" />
	</header>
	<SvgLogin />
	<main>
		<slot />
	</main>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";
@use "~/assets/core";
@use "~/assets/animation";

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
</style>
