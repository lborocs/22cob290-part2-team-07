<script setup lang="ts">
defineProps<{
	modalActive: Boolean
}>()
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
}
.backdrop {
	top: 0;
	position: absolute;
	background: rgba($color: black, $alpha: 0.5);
	width: 100%;
	height: 100%;
	left: 0;
	z-index: 10;
}

.close-btn {
	float: right;
	cursor: pointer;
}
</style>
