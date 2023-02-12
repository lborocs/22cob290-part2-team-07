<!-- The default layout is used on every page unless explicity specified -->

<script setup lang="ts">
import { Icon } from "@iconify/vue"

const route = useRoute()
const pageName = $computed<string>(
	() => route.meta.name ?? route.name!.toString(),
)

// Updates the page head information on navigation.
useHead(() => {
	return {
		title: pageName,
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

function clearFocus() {
	isNavExpanded.value = false
	if (document.activeElement) (document.activeElement as HTMLElement).blur()
}
</script>

<template>
	<div class="page-wrapper">
		<header>
			<h1>{{ pageName }}</h1>
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
					<Icon icon="material-symbols:menu" />
				</button>
				<ul>
					<li>
						<NavButton
							location="/dashboard"
							name="Dashboard"
							icon="material-symbols:analytics-outline-rounded"
							@navigate="clearFocus"
						/>
					</li>
					<li>
						<NavButton
							location="/manager"
							name="Manager"
							icon="material-symbols:admin-panel-settings-outline-rounded"
							@navigate="clearFocus"
						/>
					</li>
					<li>
						<NavButton
							location="/knowledge"
							name="Knowledge"
							icon="material-symbols:book-outline-rounded"
							@navigate="clearFocus"
						/>
					</li>
					<li>
						<NavButton
							location="/project"
							name="Project"
							icon="material-symbols:folder-outline-rounded"
							@navigate="clearFocus"
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
		<ModalManager />
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/mobile";
@use "~/assets/core";

.page-wrapper {
	display: grid;
	grid-template-areas:
		"head"
		"main";
	grid-template-rows: min-content 1fr;
	height: 100%;
	--nav-width: 3.625rem;
}

%content {
	margin-left: var(--nav-width);
}

header {
	@extend %flex-row, %flex-centre, %content;
	justify-content: space-between;
	grid-area: head;
	@media screen and (max-width: mobile.$width) {
		margin: 0;
	}
	padding: 0 1em;
	background-color: var(--colour-background-2);
	margin-bottom: 1em;
}

main {
	@extend %content;
	grid-area: main;
	padding: 0 2rem;
	@media (max-width: mobile.$width) {
		padding: 0.1rem;
		margin: 0;
	}
}
</style>

<style lang="scss">
@use "~/assets/mobile";
@use "~/assets/core";
@use "~/assets/animation";

@keyframes navlabel {
	0% {
		color: transparent;
	}
	50% {
		color: transparent;
	}
	100% {
		color: var(--colour-text);
	}
}

.nav-wrapper {
	position: fixed;
	height: 100%;
	display: flex;
	flex-direction: column;
	width: var(--nav-width);
	transition: width animation.$transition-medium ease-in-out;
	background-color: var(--colour-accent);
	z-index: 1;

	@media screen and (min-width: mobile.$width) {
		&:hover,
		&:focus-within {
			--nav-width: 12rem;

			.nav-label {
				display: block;
				font-size: unset;
				animation: navlabel animation.$transition-medium ease-in-out forwards;
			}
		}

		.nav-logo {
			aspect-ratio: 1;
			width: 3rem;
			margin-inline: auto;
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
		font-size: 0px;
	}
}

.mobile-nav-toggle {
	display: none;
}

@media screen and (max-width: mobile.$width) {
	.mobile-nav-toggle {
		display: block;
		position: fixed;
		right: 0;
		background: var(--colour-background-1);
		color: var(--colour-accent);
		border: none;
		--size: 3.5rem;

		margin: 0.5rem;
		padding: 0;
		display: grid;
		place-items: center;
		font-size: calc(var(--size) / 2);

		width: var(--size);
		aspect-ratio: 1.25;
		border-radius: 100vmax;
	}

	.nav-wrapper {
		// width: min-content;
		--nav-width: max-content;
		.nav-label {
			display: block;
			font-size: unset;
		}
	}

	button[aria-expanded="false"] ~ :is(ul, img) {
		display: none;
	}

	.nav-wrapper ul {
		margin-top: 3rem;
	}

	.nav-logo {
		display: none;
	}
}
</style>
