<!-- The default layout is used on every page unless explicity specified -->

<script setup lang="ts">
const route = useRoute()
// Updates the page head information on navigation.
useHead(() => {
	return {
		title: route.name?.toString(),
	}
})
</script>

<template>
	<div class="page-wrapper">
		<header>
			<h1>{{ $route.name }}</h1>
			<UserIcon />
		</header>
		<nav>
			<ul>
				<li>
					<NavButton
						location="dashboard"
						name="Dashboard"
						icon="material-symbols:analytics-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="manager"
						name="Manager"
						icon="material-symbols:admin-panel-settings-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="knowledge"
						name="Knowledge"
						icon="material-symbols:book-outline-rounded"
					/>
				</li>
				<li>
					<NavButton
						location="project"
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

	width: fit-content;
	background-color: var(--colour-accent);
	ul {
		list-style: none;
		padding: 0 0.5rem;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
}

main {
	grid-area: main;
}
</style>
