<template>
	<form class="switch-form">
		<input
			type="radio"
			:id="`switch-opt-${option1}`"
			name="view-mode"
			:value="option1"
			:checked="selected == 1"
			@click="optionClick(1)"
		/>
		<label :for="`switch-opt-${option1}`">{{ option1 }}</label>
		<input
			type="radio"
			:id="`switch-opt-${option2}`"
			name="view-mode"
			:value="option2"
			:checked="selected == 2"
			@click="optionClick(2)"
		/>
		<label :for="`switch-opt-${option2}`">{{ option2 }}</label>
	</form>
</template>

<style scoped lang="scss">
@use "assets/animation";
.switch-form {
	display: grid;
	grid-template-columns: 0 1fr 0 1fr;
	text-align: center;
}

label {
	padding: 0.4rem 1rem;
	cursor: pointer;
	background-color: var(--colour-accent);
	color: var(--colour-background-1);
	transition: {
		property: color, background-color;
		duration: animation.$transition-medium;
		timing-function: ease-in-out;
	}
	&:nth-of-type(1) {
		border-radius: 100vmax 0 0 100vmax;
	}
	&:nth-of-type(2) {
		border-radius: 0 100vmax 100vmax 0;
	}
}

input[type="radio"] {
	/* Add if not using autoprefixer */
	-webkit-appearance: none;
	appearance: none;
	/* For iOS < 15 to remove gradient background */
	background-color: #fff;
	/* Not removed via appearance */
	margin: 0;

	&:checked + label {
		background-color: var(--colour-background-3);
		color: var(--colour-text);
	}
	&:focus:checked + label {
		outline: 3px solid black;
	}
}
</style>

<script setup lang="ts">
defineProps<{
	selected: number
	option1: string
	option2: string
}>()

const emit = defineEmits(["update:selected"])

function optionClick(option: number) {
	emit("update:selected", option)
}
</script>
