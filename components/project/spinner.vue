<script setup>
const props = defineProps({})
</script>

<template>
	<div
		class="spinner-parent"
		style="--progress: 60%; --progress-angle: 0.6turn"
	>
		<div class="spinner"></div>
		<div class="spinner-end-wrapper"></div>
		<div class="center">
			<h3>60%</h3>
			<p>9/15 tasks complete</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;
@use "/assets/colour.scss" as *;

$width: calc(25% / 2);
.spinner-parent {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 15rem;
	aspect-ratio: 1;
	background: transparent;
	border-radius: 100vh;
	isolation: isolate;
	margin: 0.5rem 0 0 1rem;

	&::before {
		position: absolute;
		top: 0;
		content: "";
		width: $width;
		aspect-ratio: 1;
		background: $accent;
		border-radius: 100vmax;
		z-index: 1;
	}
}

.spinner {
	--prog: var(--progress, 60%);

	position: absolute;
	border-radius: 100vmax;
	inset: 0;
	transition: --prog 0.2s ease-in;
	animation: initialise-prog 1s ease-in-out forwards;
	background: conic-gradient(
		from 0deg at 50% 50%,
		$accent var(--prog),
		$mid-grey var(--prog)
	);
}

@property --prog {
	syntax: "<percentage>";
	inherits: false;
	initial-value: 30%;
}

@keyframes initialise-prog {
	0% {
		--prog: 0%;
	}
	100% {
		--prog: var(--progress, 60%);
	}
}

@keyframes initialise-end-rot {
	0% {
		rotate: 0turn;
	}
	100% {
		rotate: var(--progress-angle, 0.6turn);
	}
}
.spinner-parent .center {
	width: 75%;
	z-index: 1;
	background-color: $highlight;
	aspect-ratio: 1;
	border-radius: 100vmax;
	display: flex;
	justify-content: center;
	flex-direction: column;
	/*box-shadow: 0 0 5px 5px rgb(0, 0, 0, 0.2);*/
}

.spinner-end-wrapper {
	position: absolute;
	width: 100%;
	aspect-ratio: 1;
	background: transparent;
	animation: initialise-end-rot 1s ease-in-out forwards;

	&::after {
		content: "";
		position: absolute;
		width: $width;
		left: calc(50% - $width / 2);

		aspect-ratio: 1;
		background: $accent;
		border-radius: 100vmax;
		z-index: 3;
	}
}
.center h3 {
	font-size: 2em;
	margin: 0;
}
.center p {
	margin: 0;
}
</style>
