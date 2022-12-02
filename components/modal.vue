<script setup></script>

<template>
	<div class="backdrop">
		<div class="modal">
			<slot name="popup-title"></slot>
			<slot name="popup-text"></slot>
			<slot name="popup-buttons"></slot>
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
	position: fixed;
	background: rgba($color: black, $alpha: 0.5);
	width: 100%;
	height: 100%;
	left: 0;
}
</style>
