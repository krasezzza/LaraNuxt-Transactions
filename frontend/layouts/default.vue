<template>
  <v-app>
    <app-bar />

    <v-main id="main-wrapper">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
