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
.switch-form {
	display: flex;
	gap: 1rem;
}
input[type="radio"] {
	/* Add if not using autoprefixer */
	-webkit-appearance: none;
	appearance: none;
	/* For iOS < 15 to remove gradient background */
	background-color: #fff;
	/* Not removed via appearance */
	margin: 0;
}

input[type="radio"]:checked + label {
	color: red;
}
</style>

<script setup lang="ts">
const emit = defineEmits(["change"])

function optionClick(option: number) {
	emit("change", option)
}
</script>
