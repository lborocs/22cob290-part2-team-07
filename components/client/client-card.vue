<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { User } from ".prisma/client"
import { profilePicture } from "~~/types/user"
import { has, Permission, permissions } from "~~/types/permission"

const { params } = useRoute()
const clientId = params.id
console.log(clientId)

// server isnt respodning with any data for /api/client/6. why???
const { data: client } = await useFetch(`/api/client/${clientId}`)
usePageName(client.value?.name)
if (!client.value) {
	navigateTo("/client/error")
}

const modalDelete = useModal()

const clientRep = client.value!.representative
const clientEmail = client.value!.email
const clientPhone = client.value!.phone
const clientAddress = client.value!.address
const clientWebsite = client.value!.website

const repProfilePicture = ref(profilePicture(clientRep))
let clientAddressMaps = clientAddress
let mapsQuery = ""

if (clientAddress) {
	// replace any spaces with commas with a plus symbol to meet the google maps URL requirements
	clientAddressMaps = clientAddressMaps!.replace(" ", "+")
	mapsQuery =
		"https://www.google.com/maps/search/?api=1&query=" + clientAddressMaps
}
</script>

<template>
	<div class="card flex-col centre">
		<div class="card-title-wrapper client-title">
			<h2 name="name" class="edit__titles">Client details</h2>
			<!-- <Button
				v-if="
					has(
						permissions(useCurrentUserPermissions()),
						Permission.Client_Delete,
					)
				"
				icon="material-symbols:delete-outline-rounded"
				@click="modalDelete.show()"
				>Delete</Button
			> -->
		</div>

		<div class="client-details-wrap">
			<div class="card-small bg-accent card-bigger">
				<h3 class="title-card-small text-center">Client representative</h3>
				<div class="flex-col-center">
					<img
						:src="repProfilePicture"
						alt="profile"
						class="card-small-image profile-pic"
						id=""
					/>
					<h2 name="name" class="edit__titles">{{ clientRep }}</h2>
				</div>
			</div>

			<div class="card-small bg-accent card-bigger">
				<h3 class="title-card-small text-center">Contact information</h3>
				<div class="flex-col-center">
					<h2 name="name" class="edit__titles">
						Email:
						<span class="client-details-text">{{ clientEmail }}</span>
						<div v-if="clientPhone">
							Phone:
							<span class="client-details-text">{{ clientPhone }}</span>
						</div>
						<div v-if="clientWebsite">
							Website:
							<span class="client-details-text">{{ clientWebsite }}</span>
						</div>
					</h2>
					<div class="link-list text-center">
						<a
							:href="`mailto:${clientEmail}`"
							id="client-email"
							target="_blank"
						>
							Contact via email</a
						>
						<a
							v-if="clientWebsite"
							:href="clientWebsite"
							id="client-web"
							target="_blank"
							>Access website
							<span class="material-symbols-outlined">outbound</span></a
						>
					</div>
				</div>
			</div>

			<div class="card-small bg-accent card-bigger" v-if="clientAddress">
				<h3 class="title-card-small text-center">Office location</h3>
				<div class="flex-col-center">
					<p
						class="card-small-text text-center-positioning"
						id="client-address"
					></p>
					<div class="link-list text-center">
						<h2 name="name" class="edit__titles">{{ clientAddress }}</h2>
						<a :href="mapsQuery" target="_blank">View on Google Maps</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<DeleteConfirmation :control="modalDelete" name="Client" />
</template>

<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

.client-title {
	@extend %flex-space;
}

.client-details-text {
	font-weight: 400;
}

.topcards-wrapper {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.card-small-text {
	font-size: 1.5em;
	font-weight: 600;
	margin: 0 0 1rem 0; /* top right bottom left */
	/* margin-top: 2rem;
    margin-bottom: 1rem; */
}

.text-center-positioning {
	margin: 1rem 0 1rem 0;
	text-align: center;
}

.card-small-image {
	aspect-ratio: 1;
	border-radius: 100vh;
	width: 8rem;
	height: 8rem;
	margin: 1rem 0 1rem 0;
}

.link-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	font-weight: 600;
}

.link-list a {
	color: colour.$accent;
}

.div-center {
	margin: auto;
}

.small-cards-wrapper-center {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: center;
}

.flex-col-center {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 30%;
}

.client-details-wrap {
	display: grid;
	// --card-width: min(30ch, 75%);

	--card-width: 40ch;
	grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
	gap: 1rem;
	justify-items: center;
	margin: 1rem 1rem; /* top right bottom left */
}

.card-bigger {
	min-width: var(--card-width);
}

#client-web span {
	font-size: 1em;
}

.card-small {
	width: 100%;
	text-align: center;
}
</style>
