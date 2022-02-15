<template>
  <div class="snackbar-wrapper">
    <v-snackbar
      v-for="(snackbar, index) in snackbars"
      :key="snackbar.id"
      :value="snackbar.visible"
      content-class="pa-0"
      :timeout="snackbar.timeout"
      :style="`bottom: ${(index * 86)}px`"
      light
      bottom
      left
      @input="hideMessage(snackbar)"
    >
      <div class="d-flex">
        <div
          class="px-6"
          :class="`message-${snackbar.type}`"
        >
          <v-icon
            v-if="snackbar.type === 'success'"
            color="var(--v-grey-lighten)"
          >
            mdi-check-circle-outline
          </v-icon>

          <v-icon
            v-if="snackbar.type === 'error'"
            color="var(--v-grey-lighten)"
          >
            mdi-close-circle-outline
          </v-icon>
        </div>

        <div class="pa-4">
          <h4 class="text-capitalize font-weight-bold mb-1">
            {{ snackbar.type }}
          </h4>

          <p class="text-justify mb-0">
            {{ snackbar.text }}
          </p>

          <v-btn
            icon
            x-small
            class="popup-close-btn"
            @click="hideMessage(snackbar)"
          >
            <v-icon color="var(--v-grey-base)">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'AppSnackbar',
  computed: {
    snackbars () {
      return this.$store.state.snackbar.popups
    }
  },
  methods: {
    hideMessage (snackbar) {
      this.$store.dispatch(
        'snackbar/hideSnackbar',
        snackbar
      )
    }
  }
}
</script>

<style scoped>
.popup-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
