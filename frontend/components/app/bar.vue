<template>
  <v-app-bar
    id="app-bar"
    class="px-12"
    fixed
    app
  >
    <nuxt-link
      to="/"
      class="logo-link"
    >
      <div class="d-flex">
        <v-img
          :src="require('~/assets/img/peach.png')"
          max-width="28"
        />

        <h2 class="ml-3">
          Peachtree Bank
        </h2>
      </div>
    </nuxt-link>

    <v-spacer />

    <v-btn
      v-if="$auth.loggedIn"
      text
      disabled
      :ripple="false"
      color="grey-darken"
      class="d-none d-sm-block mx-0"
    >
      <span
        class="text-transform-none text-bold"
      >
        {{ $auth.user.data.name }}
      </span>

      <v-icon class="ml-1">
        mdi-account
      </v-icon>
    </v-btn>

    <v-btn
      v-if="$auth.loggedIn"
      text
      :disabled="isLoading"
      color="grey"
      class="ml-1 mr-0"
      @click="logout()"
    >
      <span
        class="text-transform-none text-bold d-none d-sm-block"
      >
        Logout
      </span>

      <v-icon class="ml-1">
        mdi-logout
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async logout () {
      this.isLoading = true

      await this.$auth.logout()
        .then(() => {
          this.$router.replace('/login')
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })

      this.isLoading = false
    }
  }
}
</script>
