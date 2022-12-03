<script setup>
definePageMeta({
	name: "Profile",
})
</script>

<template>
	<p>The Edit Profile Page</p>
	<profile-card>
		<template #name>
			<h2 id="title-card">Name</h2>
			<!-- Need to make this dynamic -->
		</template>
		<template #account>
			<h2 id="title-card">Account</h2>
		</template>
		<template #hierachy>
			<h2 id="hierarchy-card">Employee</h2>
			<!-- Need to make this dynamic -->
		</template>
	</profile-card>
	<Modal v-show="false" class="align">
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

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}
</style>
