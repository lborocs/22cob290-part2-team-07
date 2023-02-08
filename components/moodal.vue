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
.modal {
	width: 28rem;
	height: 13rem;
	padding: 1.25rem;
	margin: 6.25rem auto;
	background: white;
	border-radius: 0.625rem;
	text-align: center;
	position: fixed;
}

.backdrop {
	position: absolute;
	background-color: #242424;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
}

::backdrop {
	background-color: black;
}

.close-btn {
	float: right;
	cursor: pointer;
	border: none;
	background-color: none;
}
</style>
