<template>
  <v-card>
    <v-card-title class="justify-center card-title py-4">
      <v-tooltip right>
        <template #activator="{ on, attrs }">
          <nuxt-link to="/">
            <v-icon
              color="var(--v-primary-lighten)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-arrow-left
            </v-icon>
          </nuxt-link>
        </template>

        <span>Back to Recent Transactions</span>
      </v-tooltip>

      <v-spacer />

      <h5>
        Transaction Details for {{ transactionId }}
      </h5>

      <v-spacer />

      <div />
    </v-card-title>

    <v-card-text class="px-6 py-6">
      <v-simple-table>
        <template #default>
          <tbody>
            <tr>
              <td width="30%">
                <strong>Amount</strong>
              </td>

              <td>{{ transactionDetails.amount }}</td>
            </tr>

            <tr>
              <td width="30%">
                <strong>Date</strong>
              </td>

              <td>{{ transactionDetails.date }}</td>
            </tr>

            <tr>
              <td width="30%">
                <strong>Receiver</strong>
              </td>

              <td>{{ transactionDetails.receiver }}</td>
            </tr>

            <tr>
              <td width="30%">
                <strong>State</strong>
              </td>

              <td>{{ transactionDetails.state }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div class="d-flex justify-end mt-8 mb-3 px-4">
        <strong class="align-self-center">
          Update state:
        </strong>

        <v-select
          :items="['created', 'pending', 'paid']"
          label="State"
          class="status-update"
          hide-details
          solo
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TransactionDetails',
  computed: {
    transactionId () {
      return this.$route.params.transactionId
    },
    transactionDetails () {
      return {
        id: '564654',
        amount: '-$82.02',
        date: '19 Oct 2020',
        receiver: 'The Tea Lounge',
        state: 'paid'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.status-update {
  max-width: 250px;
  margin-left: 25px;
  box-shadow: none;
}
</style>
