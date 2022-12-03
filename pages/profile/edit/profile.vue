<script setup>
definePageMeta({
	name: "Profile",
})
</script>

<template>
	<p>The Edit Profile Page</p>
	<Modal v-show="true" class="align">
		<template #popup-title>
			<h2>Upload Photo</h2>
		</template>
		<template #popup-text>
			<p>Upload a photo of your choice</p>
		</template>
		<template #popup-buttons>
			<button class="upload-button">Upload</button>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;
@use "/assets/colour";
.align {
	display: flex;
	align-items: center;
	justify-content: center;
}

.upload-button {
	margin-top: 1.2rem;
	width: 25%;
	border-radius: 0.5rem;
	height: 2.5em;
	background: colour.$accent;
}
</style>
