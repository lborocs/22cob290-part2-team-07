<script setup lang="ts">
defineProps<{}>()
</script>

<template>
	<div class="backdrop">
		<div class="modal">
			<button class="close-btn" @click="$emit('close')">&#10006;</button>
			<slot name="content"></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/theme";
.modal {
	width: fit-content;
	height: fit-content;
	padding: 1.25rem;
	margin: 6.25rem auto;
	background: var(--colour-background-2);
	border: 2px solid var(--colour-accent);
	border-radius: 0.625rem;
	text-align: center;
}

.backdrop {
	position: absolute;
	background-color: rgba(111, 111, 111, 0.8);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
}

::backdrop {
	background-color: black;
}

.close-btn {
	float: right;
	cursor: pointer;
	border: none;
	background-color: transparent;
}
</style>
