<template>
  <div :key="renderIndex">
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

      <v-card-text class="px-6 py-8">
        <v-skeleton-loader
          v-if="isLoading"
          type="list-item-avatar@4"
        />

        <v-simple-table
          v-else
        >
          <template #default>
            <tbody>
              <tr>
                <td width="30%">
                  <strong>Amount</strong>
                </td>

                <td>
                  <span v-if="transaction.amount">
                    {{ $format.price(transaction.amount) }}
                  </span>
                </td>
              </tr>

              <tr>
                <td width="30%">
                  <strong>Date</strong>
                </td>

                <td>
                  <span v-if="transaction.created_at">
                    {{ $dateFns.format(transaction.created_at, 'dd MMM yyyy') }}
                  </span>
                </td>
              </tr>

              <tr>
                <td width="30%">
                  <strong>Receiver</strong>
                </td>

                <td>
                  <span v-if="transaction.receiver">
                    {{ transaction.receiver }}
                  </span>
                </td>
              </tr>

              <tr>
                <td width="30%">
                  <strong>State</strong>
                </td>

                <td>
                  <span v-if="transaction.state">
                    {{ transaction.state }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-card-actions
        v-if="!isLoading"
        class="px-6 pt-2 pb-6"
      >
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="error"
              class="align-self-center"
              v-bind="attrs"
              v-on="on"
              @click="toggleDeleteDialog(true)"
            >
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </template>

          <span>Delete transaction</span>
        </v-tooltip>

        <v-spacer />

        <strong class="align-self-center">
          Update state:
        </strong>

        <v-select
          v-model="transactionState"
          :items="['send', 'received', 'paid']"
          label="State"
          class="status-update"
          hide-details
          solo
          @change="updateState()"
        />
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="deleteDialog"
      max-width="540"
      persistent
    >
      <v-card class="py-4 px-2">
        <v-card-title>
          <h4>Are you sure?</h4>
        </v-card-title>

        <v-card-text>
          In case you confirm this action, the item will be permanently deleted.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            text
            @click="toggleDeleteDialog(false)"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            text
            :disabled="isConfirmDisabled"
            @click="removeTransaction()"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetails',
  data () {
    return {
      transaction: {},
      transactionState: null,
      deleteDialog: false,
      isConfirmDisabled: false
    }
  },
  async fetch () {
    await this.loadTransaction()
  },
  computed: {
    transactionId () {
      return this.$route.params.transactionId
    },
    renderIndex () {
      return this.$store.state.transaction.renderKeyOne
    },
    isLoading () {
      return this.$store.state.transaction.loading
    }
  },
  watch: {
    async renderIndex () {
      await this.loadTransaction()
    }
  },
  methods: {
    async loadTransaction () {
      await this.$store.dispatch(
        'transaction/updateLoadingStatus',
        true
      )

      this.transaction =
        await this.$api.oneTransaction(
          this.transactionId,
          this.$auth.user.token
        ).then((res) => {
          return res.data
        }).catch((err) => {
          return this.$nuxt.error({
            statusCode: err.response.status,
            message: err.response.statusText
          })
        })

      this.transactionState = this.transaction.state

      await this.$store.dispatch(
        'transaction/updateLoadingStatus',
        false
      )
    },
    async updateState () {
      await this.$api.updateTransaction(
        this.transactionId,
        {
          state: this.transactionState
        },
        this.$auth.user.token
      ).then((res) => {
        this.$toast.success('Transaction updated successfully.')
        this.$store.dispatch('transaction/updateRenderKeyOne')

        return res.data
      }).catch(() => {
        this.$toast.error('Transaction could not be updated!')

        return {}
      })
    },
    async removeTransaction () {
      this.isConfirmDisabled = true

      await this.$api.deleteTransaction(
        this.transactionId,
        this.$auth.user.token
      ).then((res) => {
        this.$toast.success('Transaction deleted successfully.')
        this.$router.replace('/')

        return res.data
      }).catch((err) => {
        return this.$nuxt.error({
          statusCode: err.response.status,
          message: err.response.statusText
        })
      })

      this.isConfirmDisabled = false
    },
    toggleDeleteDialog (isVisible) {
      this.deleteDialog = isVisible
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
