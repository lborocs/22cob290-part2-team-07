<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Profile view",
})
</script>

<!-- template for the majority of the code to makeup the profile view page -->
<template>
	<!-- returns the ID of the user who is currently logged in -->

	<!-- The main card which has all the information being presented to the user for this page -->
	<profile-view-card>
		<template #name>
			<h2 id="title-card">name</h2>
		</template>
		<template #account>
			<h2 id="title-card">Account</h2>
		</template>
		<template #hierachy>
			<h2 id="hierarchy-card">Rank</h2>
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
