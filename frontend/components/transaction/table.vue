<template>
  <v-card :key="renderIndex">
    <v-card-title class="justify-center card-title py-4">
      <v-icon color="var(--v-primary-lighten)">
        mdi-briefcase-variant
      </v-icon>

      <v-spacer />

      <h5>
        Recent Transactions
      </h5>

      <v-spacer />

      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-icon
            color="var(--v-primary-lighten)"
            v-bind="attrs"
            v-on="on"
            @click="loadTransactionsList()"
          >
            mdi-autorenew
          </v-icon>
        </template>

        <span>Reload transactions list</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text class="px-6 pt-4 pb-6">
      <v-row class="pt-4 pb-8 px-2">
        <v-col
          cols="12"
          sm="4"
          class="py-2 px-1"
        >
          <v-text-field
            v-model="searchTerm"
            autocomplete="off"
            placeholder="Search by typing..."
            class="mt-0 pt-0"
            clearable
            single-line
            hide-details
          />
        </v-col>

        <v-col
          cols="12"
          sm="8"
          class="d-flex justify-center justify-sm-end py-2 px-1"
        >
          <strong
            class="align-self-center mx-3"
          >
            Sort by
          </strong>

          <v-btn-toggle
            v-model="selectedFilters"
            dense
          >
            <v-btn text>
              <span class="text-small">
                DATE
              </span>

              <v-icon size="22">
                mdi-menu-down
              </v-icon>
            </v-btn>

            <v-btn text>
              <span class="text-small">
                BENEFICIARY
              </span>
            </v-btn>

            <v-btn text>
              <span class="text-small">
                AMOUNT
              </span>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar@4"
      />

      <v-data-table
        v-else
        :headers="headers"
        :items="transactions"
        :search="searchTerm"
        hide-default-header
        item-key="id"
      >
        <template #[`item`]="{ item, index }">
          <nuxt-link
            :to="`/details/${item.id}`"
            class="table-link"
            :class="{ 'border-top-removed': index > 0 }"
          >
            <div
              class="status-section"
              :class="{
                'transaction-send': item.state === 'send',
                'transaction-received': item.state === 'received',
                'transaction-paid': item.state === 'paid',
              }"
            />

            <div
              class="transaction-date px-2"
            >
              {{ $dateFns.format(item.created_at, 'dd MMM') }}
            </div>

            <div class="transaction-logo">
              <v-img
                src="https://www.uschamberfoundation.org/sites/default/files/styles/detail_image800w/public/Starbucks-Logo-Square.jpg?itok=f9VEhq5u"
                max-width="32px"
                class="mx-auto"
              />
            </div>

            <div class="transaction-receiver px-4">
              <span class="text-bold">
                {{ item.receiver }}
              </span>
              <br>
              <span class="text-capitalize">
                {{ item.type }}
              </span>
            </div>

            <div class="transaction-amount text-right">
              <h3 class="text-bold">
                {{ $format.price(item.amount) }}
              </h3>
            </div>
          </nuxt-link>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TransactionTable',
  data () {
    return {
      headers: [
        {
          text: 'Date',
          filterable: false,
          value: 'created_at'
        },
        {
          text: 'Logo',
          filterable: false,
          value: 'logo'
        },
        {
          text: 'Beneficiary',
          value: 'receiver'
        },
        {
          text: 'Amount',
          filterable: false,
          value: 'amount'
        }
      ],
      transactions: [],
      searchTerm: null,
      selectedFilters: []
    }
  },
  async fetch () {
    await this.loadTransactionsList()
  },
  computed: {
    renderIndex () {
      return this.$store.state.transaction.renderKeyList
    },
    isLoading () {
      return this.$store.state.transaction.loading
    }
  },
  watch: {
    async renderIndex () {
      await this.loadTransactionsList()
    }
  },
  methods: {
    async loadTransactionsList () {
      await this.$store.dispatch(
        'transaction/updateLoadingStatus',
        true
      )

      this.transactions =
        await this.$api.allTransactions()
          .then((res) => {
            return res.data
          }).catch((err) => {
            this.$toast.error('Transactions could not be loaded!')
            // eslint-disable-next-line no-console
            console.log(err)

            return []
          })

      await this.$store.dispatch(
        'transaction/updateLoadingStatus',
        false
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.table-link {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--v-grey-lighten);

  &:hover {
    background-color: var(--v-grey-lighten);
  }

  & > * {
    padding: 8px 16px;
  }

  .status-section {
    padding: 0 4px !important;
  }

  .transaction-send {
    background-color: var(--v-transaction-send);
  }
  .transaction-received {
    background-color: var(--v-transaction-received);
  }
  .transaction-paid {
    background-color: var(--v-transaction-paid);
  }

  .transaction-date {
    width: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .transaction-logo {
    width: 16%;
    display: flex;
    align-items: center;
  }
  .transaction-receiver {
    width: 50%;
  }
  .transaction-amount {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.border-top-removed {
  border-top: none;
}
</style>
