<template>
  <v-row
    justify="center"
    align="center"
    class="py-0"
  >
    <v-col
      cols="12"
      md="4"
      class="align-self-start px-3"
    >
      <transaction-create />
    </v-col>

    <v-col
      cols="12"
      md="8"
      class="align-self-start px-3"
    >
      <transaction-details />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TransactionDetailsPage',
  middleware: 'loggedIn'
}
</script>
