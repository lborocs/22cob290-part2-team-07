<script setup lang="ts"></script>

<template>
	<Form to="/knowledge/search/">
		<input name="q" type="text" placeholder="Search..." />
		<select name="topic">
			<option value="">Any Topic</option>
		</select>
		<Button type="submit" icon="material-symbols:search-rounded">
			Search</Button
		>
		<ButtonNuxt to="/knowledge/post/" icon="material-symbols:add">
			Create Post</ButtonNuxt
		>
	</Form>
</template>

<style scoped lang="scss">
@use "~/assets/core";

form {
	width: 70%;
	@include core.flex(row);
}

input {
	background-color: var(--colour-background-2);
	border: none;
	padding: 0.75rem;
	width: 75%;
	box-shadow: var(--card-shadow);
	border-radius: 0.5rem;
}

select {
	background-color: var(--colour-highlight);
	width: fit-content;
	max-width: 35%;
	/* added this as it stops large topic names going off screen */
	margin: 0.5rem;
	cursor: pointer;
}
</style>
