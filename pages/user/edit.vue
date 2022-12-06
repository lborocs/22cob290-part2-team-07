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
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;
@use "/assets/colour";

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}
</style>
