<script setup lang="ts">
const topics = ref<Topic[]>([])
$fetch("/api/topics").then(values => (topics.value = values))
</script>

<template>
	<Form to="/knowledge/search/">
		<input
			name="q"
			type="text"
			placeholder="Search..."
			:value="$route.query.q"
		/>
		<select name="topic" :value="$route.query.topic">
			<option value="">Any Topic</option>
			<option v-for="topic in topics" :key="topic.uid" :value="topic.uid">
				{{ topic.name }}
			</option>
		</select>
		<Button type="submit" icon="material-symbols:search-rounded">Search</Button>
		<ButtonNuxt to="/knowledge/post/" icon="material-symbols:add"
			>Create Post</ButtonNuxt
		>
	</Form>
</template>

<style scoped lang="scss">
@use "~/assets/core";

form {
	@extend %flex-row, %flex-centre;
	> * {
		margin: {
			top: 0.25rem;
			bottom: 0.25rem;
		}
		font-size: 1.5em;
	}
}

input {
	@extend %input;
	--input-background: var(--colour-background-2);
	border: none;
	padding: 0.75rem;
	width: 80%;
	box-shadow: var(--card-shadow);
}

select {
	@extend %input;
	--input-background: var(--colour-background-2);
	width: fit-content;
	max-width: 15ch;
	/* added this as it stops large topic names going off screen */
	margin: 0.5rem;
	cursor: pointer;
}
</style>
