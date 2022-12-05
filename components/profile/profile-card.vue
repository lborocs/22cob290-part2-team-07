<script>
export default {
	data() {
		return {
			name: "Name", // need to make dynamic
			isShown: false,
		}
	},
	methods: {
		toggleModal() {
			this.isShown = !this.isShown
		},
	},
}
</script>
<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper">
			<slot name="name"></slot>
			<slot name="account">Account</slot>
		</div>
		<hr />
		<div class="card-image-wrapper">
			<slot name="hierarchy">Employee</slot>
			<img
				id="card-profile-picture"
				src="https://ui-avatars.com/api/?name=Neumann&background=random&size=50&format=svg"
				alt=""
				class="profile-pic"
			/>
		</div>
		<Modal v-show="isShown" class="align">
			<template #close-btn>
				<div class="close-btn" @click="toggleModal">&#10006;</div>
			</template>
			<template #popup-title>
				<h2>Upload Photo</h2>
			</template>
			<template #popup-text>
				<p>Upload a photo of your choice</p>
			</template>
			<template #popup-buttons>
				<button class="upload-button">Upload</button>
			</template>
		</Modal>
		<div class="card-button-wrapper">
			<button @click="toggleModal" id="card-upload-button">
				<p>Upload photo</p>
			</button>
		</div>

		<div class="card-customisation-wrapper">
			<div class="wrapper-appearance">
				<hr class="solid" />
				<h1 class="bold-title">Appearance</h1>
				<label for="theme" class="label-subtext"
					>Customize how Make-It-All looks on your device</label
				>
				<select name="theme" class="theme">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>
			<div class="wrapper-password">
				<hr class="solid" />
				<h1 class="bold-title">Password</h1>
				<label for="change-password-btn" class="label-subtext"
					>Change your password to a more memorable one</label
				>
				<button id="change-password-btn">
					<p>Change Password</p>
				</button>
			</div>
			<div class="wrapper-email">
				<hr class="solid" />
				<h1 class="bold-title">My Email</h1>
				<label for="email-box" class="label-subtext"
					>This is your assigned company email</label
				>
				<label id="email-box">f.batmaz@lboro.ac.uk</label>
				<img class="email-lock-img" src="~/assets/lock.png" alt="lock" />
			</div>
			<div class="wrapper-invite">
				<hr class="solid" />
				<h1 class="bold-title">Invite Others</h1>
				<label for="invite-btn" class="label-subtext"
					>Invite your co-workers who have not yet signed up</label
				>
				<button id="invite-btn">
					<p>Invite</p>
				</button>
			</div>
			<div class="wrapper-logout">
				<hr />
				<button class="logout-btn" id="logout">
					<p>Logout</p>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "/assets/core.scss" as *;
@use "/assets/colour";

$logout: #da0000;
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
	cursor: pointer;
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

.close-btn {
	float: right;
	cursor: pointer;
}
</style>
