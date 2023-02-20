<script setup lang="ts">
import { emailDomain, login } from "@/types/user"
import { form2Object } from "@/types/generic"
import { hashPassword } from "~~/types/password"

definePageMeta({
	layout: "loginreg",
	name: "Login",
})
const modalError = useModal()

const form = ref<HTMLFormElement>()
async function submit() {
	const data = form2Object(form.value!)
	data.password = hashPassword(data.email, data.password)
	const result = await $fetch("/api/login", {
		method: "POST",
		body: data,
	})
	if (!result) {
		modalError.show()
	} else {
		login(result)
		navigateTo("/dashboard")
	}
}
</script>

<template>
	<form class="form" ref="form" @submit.prevent="submit">
		<label id="title">Member Login</label>
		<label for="Email">Email:</label>
		<div class="flex-row jc-centre">
			<input
				type="text"
				id="Email"
				name="email"
				placeholder="Example"
				required
				autocomplete="username"
			/>
			<label id="emailPosition">{{ emailDomain }}</label>
		</div>
		<label for="Password">Password:</label>
		<input
			type="password"
			id="Password"
			name="password"
			required
			autocomplete="current-password"
		/>
		<Button type="submit" icon="material-symbols:login-rounded">Login</Button>
	</form>
	<div id="dialogues">
		<Modal :control="modalError" title="Incorrect Username or Password">
			<p>Please try again</p>
		</Modal>
	</div>
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
#emailPosition {
	font-size: 1rem;
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
/* .form #emailPosition {
	align-self: flex-end;
	transform: translate(1rem, -2.5rem);
} */

#dialogues {
	position: absolute;
}
</style>
