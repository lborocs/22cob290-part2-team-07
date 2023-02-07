<script setup lang="ts">
// defining the page
definePageMeta({
	name: "Clients page",
})
</script>
<template>

	<div>Client: {{ $route.params.id }}</div>

	<client-card>
		<template #client-details>
			<h2 id="title-card">Client details</h2>
		</template>
		<template #client-name>
			<h2 id="title-card">Ada Bryon</h2>
			<!-- use properties or moustache brackets instead on lots of slots--
		</template>
		<template #contact-information>
			<h2 id="title-card">Email: ada@LoveLace.co.uk Phone: +44 0123 456 789 Website: LoveLace.co.uk</h2>
		</template>
	</client-card>

</template>


<style scoped lang="scss"></style>
