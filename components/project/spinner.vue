<script setup>
const props = defineProps({})

// Update circular progress bar
function updateProgressBar() {
	const progress = project.progress()

	document.querySelector("#percentageDone").innerHTML =
		(progress.percentage * 100).toFixed(1) + "%"
	document.querySelector("#tasksDone").innerHTML =
		progress.done + "/" + progress.total + " tasks done"

	document
		.querySelector("#progress-bar")
		.style.setProperty("--progress", progress.percentage * 100 + "%")
	document
		.querySelector("#progress-bar")
		.style.setProperty("--progress-angle", progress.percentage + "turn")
}
</script>

<template>
	<div
		class="spinner-parent"
		id="progress-bar"
		style="--progress: 70%; --progress-angle: 0.7turn"
	>
		<div class="spinner"></div>
		<div class="spinner-end-wrapper"></div>
		<div class="center">
			<span id="percentageDone">70%</span>
			<p id="tasksDone">9/15 tasks done</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "~/assets/colour";
@use "~/assets/animation";

.spinner-parent {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 14rem;
	aspect-ratio: 1;
	background: transparent;
	border-radius: 100vh;
	isolation: isolate;
	--width: calc(25% / 2);

	&::before {
		position: absolute;
		top: 0;
		content: "";
		width: var(--width);
		aspect-ratio: 1;
		background: var(--colour-accent);
		border-radius: 100vmax;
		z-index: 1;
	}
}

.spinner {
	--prog: var(--progress, 60%);

	position: absolute;
	border-radius: 100vmax;
	inset: 0;
	transition: --prog animation.$transition-medium ease-in;
	animation: initialise-prog 1s ease-in-out forwards;
	background: conic-gradient(
		from 0deg at 50% 50%,
		var(--colour-accent) var(--prog),
		colour.$mid-grey var(--prog)
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
	background-color: var(--colour-highlight);
	aspect-ratio: 1;
	border-radius: 100vmax;
	display: flex;
	justify-content: center;
	flex-direction: column;
	//box-shadow: 0 0 5px 5px rgb(0, 0, 0, 0.2);
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
		width: var(--width);
		left: calc(50% - var(--width) / 2);

		aspect-ratio: 1;
		background: var(--colour-accent);
		border-radius: 100vmax;
		z-index: 3;
	}
}
.center #percentageDone {
	font-size: 2em;
	margin: 0;
	font-weight: 700;
}
.center p {
	margin: 0;
}
</style>
