<script setup>
definePageMeta({
	name: "Profile",
})
</script>

<template>
	<p>The Edit Profile Page</p>
	<Modal class="align">
		<template #popup-title>
			<h2>Upload Photo</h2>
		</template>
		<template #popup-text>
			<p>Upload a photo of your choice</p>
		</template>
		<template #popup-buttons>
			<button>Upload</button>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
.align {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
