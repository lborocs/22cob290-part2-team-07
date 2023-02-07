<script setup>
definePageMeta({
	name: "Profile",
})

const modalActive = ref(false)
</script>

<template>
	<p>The Edit Profile Page</p>
	<Moodal
		v-show="modalActive"
		@close="modalActive = !modalActive"
		class="align modal"
	>
		<template #content>
			<h2>Upload Photo</h2>
			<p>Upload a photo of your choice</p>
			<input
				type="file"
				accept="image/*"
				ref="fileInput"
				@change="uploadPhoto"
				class="hidden"
			/>
			<button @click="" class="upload-button spacing">Upload photo</button>
			<button class="upload-button spacing" @click="toggleUpload">Save</button>
		</template>
	</Moodal>
	<profile-card>
		<template #account>
			<h2 id="title-card">Account</h2>
		</template>
		<template #hierachy>
			<h2 id="hierarchy-card">Employee</h2>
			<!-- Need to make this dynamic -->
		</template>
	</profile-card>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}

.align {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
