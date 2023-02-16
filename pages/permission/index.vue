<script setup lang="ts">
definePageMeta({
	name: "Permissions",
})

const { data: roles } = await useFetch("/api/roles")
</script>

<template>
	<section class="roles">
		<h2>Roles</h2>
		<PermissionRolebar v-for="role in roles" :key="role.uid" :role="role" />
	</section>
</template>

<style scoped lang="scss">
@use "@/assets/core";

section.roles {
	@extend %card;
}
</style>
