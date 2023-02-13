<script setup lang="ts">


import { rolesTitle,profilePicture,emailDomain } from "~~/types/user"
import {UserRank} from "~~/types"
import {ref } from 'vue'
import { User } from ".prisma/client"
import { useRoute } from 'vue-router'

const { params } = useRoute()
const userEmail = params.id
console.log(userEmail)
const { data: user } = await useFetch(`/api/user/${userEmail}`)

console.log(user)
const username = user.value!.name

const userRank = rolesTitle(user.roles)
console.log(userRank)
console.log(user.roles)

const userProfilePicture = ref(profilePicture(username))
const userEmailAddress = userEmail + emailDomain
defineProps<{}>()
</script>

<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper">
			<h2 name="name" class="edit__titles">{{username}}</h2>
			<h2 name="account" class="edit__titles">Account</h2>
		</div>
		<hr />
		<div class="card-image-wrapper">
			<h2 name="hierarchy" class="user__rank">"user_rank"</h2>
			
			<!-- :src= "XXX" is how to do it when i want to use variable from above -->

			<img
				id="card-profile-picture"
				:src= "userProfilePicture"
				alt=""
				class="profile-pic"
			/>
		</div>

		<div class="card-customisation-wrapper">
			<div class="wrapper-email">
				<hr class="solid" />
				<h1 class="bold-title">Their email</h1>
				<label for="email-box" class="label-subtext"
					>This is their assigned company email</label
				>
				<label id="email-box">{{ userEmailAddress }}</label>
				<img class="email-lock-img" src="~/assets/lock.png" alt="lock" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

$logout: #da0000;

.user__rank {
	text-align: center;
	font-style: normal;
	font-weight: 800;
	font-size: 1.5rem;
	line-height: 2em;
	letter-spacing: 0.01em;
	color: colour.$text-light-faded;
}

.edit__titles {
	text-decoration: underline;
	text-decoration-color: colour.$accent;
}

.align {
	display: flex;
	align-items: center;
	justify-content: center;
}
.card-title-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-image-wrapper {
	text-align: center;
	font-style: normal;
	font-weight: 800;
	font-size: 1.5rem;
	line-height: 2em;
	letter-spacing: 0.01em;
	color: colour.$text-light-faded;
	display: flex;
	flex-direction: column;
	align-items: center;
}

#card-profile-picture {
	box-sizing: border-box;
	width: fit-content;
	height: 8rem;
	border: 1px solid colour.$accent;
	border-radius: 120vh;
}

.profile-pic {
	aspect-ratio: 1;
	border-radius: 50%;
	border: 2px colour.$text-light-faded solid;
}
.card-button-wrapper {
	padding-top: 1rem;
}

#card-upload-button {
	width: fit-content;
	height: 2rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	cursor: pointer;
	background: colour.$accent;
	border-radius: 0.438rem;
}

.bold-title {
	font-size: x-large;
}

.label-subtext {
	color: colour.$text-light-faded;
	font-size: 1rem;
	line-height: 0.1rem;
}

.theme {
	border: none;
	float: right;
	padding: 0.5rem;
	border-radius: 1rem;
}
.wrapper-appearance,
.wrapper-password,
.wrapper-email,
.wrapper-invite {
	padding-bottom: 1rem;
}

#change-password-btn,
#invite-btn {
	width: fit-content;
	height: 2rem;
	cursor: pointer;
	text-align: center;
	display: flex;
	align-items: center;
	float: right;
	background: colour.$accent;
	border-radius: 0.438rem;
}
.upload-button {
	margin-top: 1.2rem;
	width: 25%;
	border-radius: 0.5rem;
	height: 2.5em;
	background: colour.$accent;
}

#email-box {
	background-color: colour.$mid-grey;
	width: fit-content;
	height: 2rem;
	text-align: center;
	border-radius: 0.5rem;
	font-size: 1rem;
	float: right;
	padding-right: 1rem;
	padding-left: 1rem;
	display: flex;
	align-items: center;
}

.email-lock-img {
	float: right;
	padding-right: 1rem;
	padding-top: 0.5rem;
}

.logout-btn {
	width: fit-content;
	height: 2rem;
	text-align: center;
	display: flex;
	align-items: center;
	margin: auto;
	cursor: pointer;
	background: $logout;
	border-radius: 0.438rem;
	margin-top: 1rem;
}
</style>
