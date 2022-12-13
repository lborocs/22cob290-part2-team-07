<script setup lang="ts"></script>

<template>
	<!--might not be the way i do this, just seeing what works-->
	<Form to="/dashboard">
		<label for="email">Email:</label>
		<input type="email" id="email" placeholder="Example@make-it-all.com" />
		<label for="Password">Password:</label>
		<input type="password" id="Password" />
		<Button type="submit" icon="">Login</Button>
	</Form>
</template>

<style scoped lang="scss"></style>
