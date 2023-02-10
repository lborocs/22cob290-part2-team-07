<script setup lang="ts">
import prisma from "@/prisma"
</script>

<template>
	<Form to="/dashboard" class="form">
		<label id="title">Member Login</label>
		<label for="Email">Email:</label>
		<input type="text" id="Email" placeholder="Example" required />
		<label id="emailPosition">@make-it-all.com</label>
		<label for="Password">Password:</label>
		<input type="password" id="Password" required />
		<!-- i took this button from elsewhere so it just lets you log in no matter what lol-->
		<Button type="submit" icon="material-symbols:login-rounded">Login</Button>
	</Form>
</template>

<style scoped lang="scss">
.form {
	display: flex;
	box-sizing: border-box;
	align-content: center;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex-wrap: wrap;

	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	padding: 2rem;

	background: var(--colour-highlight);
	border: 1rem solid var(--colour-highlight);
	box-shadow: 0px 4px 4px var(--colour-text);
	border-radius: 2rem;
}

.form input {
	background: var(--colour-highlight);
	border: 0.1rem solid var(--colour-accent);
	border-radius: 1rem;
	font-size: 1.2rem;
	padding: 0.5rem;
	margin: 0.6rem;
}
.form label {
	font-size: 1.25rem;
}
.form #title {
	font-size: 2rem;
	text-align: center;
	font-weight: Bold;
}
.form #Email {
	width: 40%;
	align-self: flex-start;
}
.form #emailPosition {
	align-self: flex-end;
	transform: translate(1rem, -2.5rem);
}
</style>
