<template>
  <v-row
    justify="center"
    align="center"
    class="py-12"
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
      <transaction-table />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
