<script setup lang="ts">
import { emailDomain } from "@/types/user"
import { formData2Object } from "@/types/generic"
definePageMeta({
	layout: "loginreg",
	name: "Registration",
})

const route = useRoute()
const { data: email } = await useFetch(`/api/invite/${route.params.code}`)

const form = ref<HTMLFormElement>()
async function submit() {
	console.log(form.value)

	const data = new FormData(form.value)
	data.append("code", route.params.code)

	if (data.get("password") != data.get("passwordConfirm")) {
		// TODO: Show error message
	}

	let test = {}
	const body = formData2Object(data)

	try {
		const result = await $fetch("/api/register", { method: "POST", body })
		navigateTo("/login")
	} catch (err) {
		// TODO: Show error. Should not happen though!
	}
}
</script>

<template>
	<div v-if="!email">Sorry you don't exist</div>
	<form @submit.prevent="submit" class="form" ref="form" v-else>
		<label id="title">Member Registration</label>
		<label for="Email">Email:</label>
		<input
			type="text"
			id="Email"
			placeholder="Example"
			:value="email"
			autocomplete="username"
			required
			disabled
		/>
		<label id="emailPosition">{{ emailDomain }}</label>
		<label for="Password">Password:</label>
		<input
			type="password"
			id="Password"
			name="password"
			autocomplete="new-password"
			required
		/>
		<label for="confirmPassword">Confirm Password:</label>
		<input
			type="password"
			id="confirmPassword"
			name="passwordConfirm"
			required
			autocomplete="new-password"
		/>
		<label for="name">Name:</label>
		<input type="text" id="name" name="name" required autocomplete="name" />
		<!-- i took this button from elsewhere so it just lets you log in no matter what lol-->
		<Button type="submit" icon="material-symbols:login-rounded"
			>Register</Button
		>
	</form>
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
	width: fit-content;
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
	transform: translate(-1rem, -2.5rem);
}
</style>
