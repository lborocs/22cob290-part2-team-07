<template>
	<form class="switch-form">
		<input
			type="radio"
			id="opt-list"
			name="view-mode"
			value="list"
			checked
			@click="optionClick(1)"
		/>
		<label for="opt-list">List</label>
		<input
			type="radio"
			id="opt-kanban"
			name="view-mode"
			value="kanban"
			@click="optionClick(2)"
		/>
		<label for="opt-kanban">Kanban</label>
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
import { defineEmits } from "vue"

const props = defineProps({
	selected: {
		type: Number,
		default: false,
	},
	option1: {
		type: String,
		required: true,
	},
	option2: {
		type: String,
		required: true,
	},
})

const emit = defineEmits(["update:selected"])

function optionClick(option: number) {
	emit("update:selected", option)
}
</script>
