<!-- The default layout is used on every page unless explicity specified -->

<script setup lang="ts">
import { profilePicture, emailDomain } from "@/types/user"
const route = useRoute()
// Updates the page head information on navigation.
useHead(() => {
	return {
		title: route.name?.toString(),
	}
})

const user: User = {
	uid: 1,
	email: `king${emailDomain}`,
	name: "Neumann",
}
</script>

<template>
	<div class="page-wrapper">
		<header>
			<h1>{{ $route.name }}</h1>
			<UserIcon :src="profilePicture(user)" />
		</header>
		<nav>
			<img src="~/assets/tools.svg" alt="Make It All Logo" class="nav-logo" />
			<ul>
				<li>
					<NavButton
						location="/dashboard"
						name="Dashboard"
						icon="material-symbols:analytics-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="/manager"
						name="Manager"
						icon="material-symbols:admin-panel-settings-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="/knowledge"
						name="Knowledge"
						icon="material-symbols:book-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="/project"
						name="Project"
						icon="material-symbols:folder-outline-rounded"
					/>
				</li>
			</ul>
		</nav>
		<main>
			<slot />
		</main>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";
.page-wrapper {
	display: grid;
	grid-template-areas:
		"nav head"
		"nav main";
	grid-template-columns: min-content 1fr;
	grid-template-rows: min-content 1fr;
	height: 100%;
}

header {
	grid-area: head;
}

nav {
	grid-area: nav;
	display: flex;
	flex-direction: column;
	width: fit-content;
	background-color: var(--colour-accent);

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		list-style: none;
		padding: 0 0.5rem;
		margin: 0;
		margin-top: 1rem;
	}
}

.nav-logo {
	aspect-ratio: 1;
	width: 5rem;
	margin-inline: auto;
}

main {
	grid-area: main;
	padding: 2rem;
	@media (max-width: mobile.$width) {
		padding: 0.1rem;
	}
}
</style>
