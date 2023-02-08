<script setup>
definePageMeta({
	name: "Profile",
})

const modalActive = ref(false)
</script>

<template>
	<p>The Edit Profile Page</p>
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
</style>
