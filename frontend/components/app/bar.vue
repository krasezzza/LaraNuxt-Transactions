<template>
  <v-app-bar
    id="app-bar"
    fixed
    app
  >
    <nuxt-link
      to="/"
      class="logo-link"
    >
      <div class="d-flex">
        <v-img
          :src="require('~/assets/peach.png')"
          max-width="28"
        />

        <h2 class="ml-3">
          Peachtree Bank
        </h2>
      </div>
    </nuxt-link>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>
