
<template>
	<div class="card flex-col centre">
        <div class="card-title-wrapper">
            <slot name="client-details"></slot>
        </div>

        <div class="client-details-wrap">
            <div class="card-small bg-accent card-bigger">
            <h3 class="title-card-small text-center">Client representative</h3>
            <div class="flex-col-center">
                <img
                src=""
                alt="profile"
                class="card-small-image profile-pic"
                id="client-image"
                />
                <p class="card-small-text" id="client-representative"></p>
            </div>
            </div>

            <div class="card-small bg-accent card-bigger">
            <h3 class="title-card-small text-center">Contact information</h3>
            <div class="flex-col-center">
                <p
                class="card-small-text text-center-positioning"
                id="client-info"
                ></p>
                <div class="link-list text-center">
                <a href="" id="client-email" target="_blank">
                    Contact via email</a
                >
                <a href="" id="client-web" target="_blank"
                    >Access website
                    <span class="material-symbols-outlined">outbound</span></a
                >
                </div>
            </div>
            </div>

            <div class="card-small bg-accent card-bigger">
            <h3 class="title-card-small text-center">Office location</h3>
            <div class="flex-col-center">
                <p
                class="card-small-text text-center-positioning"
                id="client-address"
                ></p>
                <div class="link-list text-center">
                <a href="#">View on Google Maps</a>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
@use "~/assets/core";
@use "/assets/colour";

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
  height: 90%;
}

.client-details-wrap {
  display: grid;
  --card-width: min(20ch, 75%);
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
</style>