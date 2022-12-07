<!-- The default layout is used on every page unless explicity specified -->

<script setup lang="ts">
import { Icon } from "@iconify/vue"

const route = useRoute()
// Updates the page head information on navigation.
useHead(() => {
	return {
		title: route.name?.toString(),
	}
})

const user = useCurrentUser()

const isNavExpanded = ref(false)

// Temporary until the login / logout logic is finalised
function logout() {
	alert("User Logged Out!")
}

function toggleMobileNav() {
	isNavExpanded.value = !isNavExpanded.value
}
</script>

<template>
	<div class="page-wrapper">
		<header>
			<h1>{{ $route.name }}</h1>
			<UserIcon v-if="user !== null" v-bind="user" :size="50" />
		</header>

		<aside class="nav-wrapper">
			<img src="~/assets/tools.svg" alt="Make It All Logo" class="nav-logo" />
			<nav>
				<button
					class="mobile-nav-toggle"
					aria-controls="menu"
					:aria-expanded="isNavExpanded"
					@click="toggleMobileNav"
				>
					<span class="sr-only">Menu</span>
					<Icon icon="mdi:menu" />
				</button>
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
					<li>
						<NavButton
							@click="logout"
							location="/login"
							name="Logout"
							icon="material-symbols:logout-rounded"
						/>
					</li>
				</ul>
			</nav>
		</aside>
		<main>
			<slot />
		</main>
	</div>
</template>

<style lang="scss">
@use "~/assets/mobile";
@use "~/assets/core";
@use "~/assets/animation";
.page-wrapper {
	display: grid;
	grid-template-areas:
		"head"
		"main";
	grid-template-rows: min-content 1fr;
	height: 100%;
	--nav-width: 3.5rem;
}

%content {
	margin-left: var(--nav-width);
}

header {
	@extend %flex-row, %flex-centre, %content;
	justify-content: space-between;
	grid-area: head;
}

.nav-wrapper {
	position: fixed;
	height: 100%;
	display: flex;
	flex-direction: column;
	width: var(--nav-width);
	transition: width animation.$transition-short;
	background-color: var(--colour-accent);

	&:hover,
	&:focus-within {
		--nav-width: 12rem;

		.nav-label {
			display: block;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		list-style: none;
		padding: 0 0.5rem;
		margin: 0;
		margin-top: 1rem;
	}

	.nav-label {
		display: none;
	}
}

.mobile-nav-toggle {
	display: none;
}

@media screen and (max-width: mobile.$width) {
	.mobile-nav-toggle {
		display: block;
		position: fixed;
	}

	.nav-wrapper {
		width: 100%;
	}

	button[aria-expanded="true"] ~ :is(ul, img) {
		display: none;
	}
}

.nav-logo {
	aspect-ratio: 1;
	width: 5rem;
	margin-inline: auto;
}

main {
	@extend %content;
	grid-area: main;
	padding: 2rem;
	@media (max-width: mobile.$width) {
		padding: 0.1rem;
	}
}
</style>
