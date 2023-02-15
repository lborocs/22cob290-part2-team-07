<script setup lang="ts">
import { User } from ".prisma/client"
import { rolesTitle } from "@/types/user"

defineProps<{
	user: UserR
	assigned?: number
}>()
</script>

<template>
	<div class="flex-col card-small">
		<NuxtLink :to="`/user/${user.uid}`">
			<UserIcon :email="user.email" :name="user.name" :size="50" />
			<h3 class="card-margins">{{ user.name }}</h3>
		</NuxtLink>
		<p class="dimmed card-margins">{{ rolesTitle(user.roles) }}</p>
		<p class="card-margins">
			Assigned hours
			<span class="detail-highlight"> {{ assigned ? assigned : "0" }} </span>
		</p>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";

.flex-col {
	@extend %flex-col;
}

.card-small {
	@extend %card-small;
	padding: 1.2rem;
}

.card-margins {
	margin: 0 0 0.5rem 0; // top right bottom left
}
</style>
