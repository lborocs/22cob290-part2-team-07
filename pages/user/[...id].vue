<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Profile view",
})
</script>

<<<<<<< Updated upstream
=======
<!-- template for the majority of the code to makeup the profile view page -->
>>>>>>> Stashed changes
<template>
	<!-- returns the ID of the user who is currently logged in -->
	<div>{{ $route.params.id[0] }}</div>

	<!-- The main card which has all the information being presented to the user for this page -->
	<profile-view-card>
		<template #name>
			<h2 id="title-card">Name</h2>
		</template>
		<template #account>
			<h2 id="title-card">Account</h2>
		</template>
		<template #hierachy>
			<h2 id="hierarchy-card">Employee</h2>
			<!-- Need to make this dynamic (profile picture and email address) -->
		</template>
	</profile-view-card>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

#title-card {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}
</style>
