<template>
  <v-container class="py-12">
    <v-card>
      <v-card-title
        class="justify-center card-title-error py-4"
      >
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <nuxt-link to="/">
              <v-icon
                color="var(--v-grey-lighten)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-arrow-left
              </v-icon>
            </nuxt-link>
          </template>

          <span>Go to Recent Transactions</span>
        </v-tooltip>

        <v-spacer />

        <h5>Error Occurred</h5>

        <v-spacer />

        <div />
      </v-card-title>

      <v-card-text
        class="text-center py-16"
      >
        <h1>
          {{ errorText }}
        </h1>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: this.errorText
    }
  },
  computed: {
    errorText () {
      let text = ''

      switch (this.error.statusCode) {
        case 404:
          text = 'Resource Not Found'
          break

        case 500:
          text = this.error.message
          break

        default:
          text = 'Oops, something went wrong!'
      }

      return text
    }
  }
}
</script>
