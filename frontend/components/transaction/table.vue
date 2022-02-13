<template>
  <v-card>
    <v-card-title class="justify-center card-title py-4">
      <v-icon color="var(--v-primary-lighten)">
        mdi-briefcase-variant
      </v-icon>

      <v-spacer />

      <h5>
        Recent Transactions
      </h5>

      <v-spacer />

      <div />
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

      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-header
        hide-default-footer
        item-key="id"
        :search="searchTerm"
      >
        <template #[`item`]="{ item, index }">
          <nuxt-link
            :to="`/details/${item.id}`"
            class="table-link"
            :class="{ 'border-top-removed': index > 0 }"
          >
            <div
              class="status-section"
            />

            <div
              class="px-2"
              style="width: 13%; display: flex; align-items: center; justify-content: center"
            >
              {{ item.date.substr(0, 6).trim() }}
            </div>

            <div style="width: 16%; display: flex; align-items: center">
              <v-img
                :src="item.logo"
                max-width="32px"
                class="mx-auto"
              />
            </div>

            <div class="text-left px-4" style="width: 50%;">
              <span class="text-bold">
                {{ item.beneficiary }}
              </span>
              <br>
              <span class="text-capitalize">
                {{ item.type }}
              </span>
            </div>

            <div
              class="text-right"
              style="width: 20%; display: flex; align-items: center; justify-content: end"
            >
              <h3 class="text-bold">
                {{ item.amount }}
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
          value: 'date'
        },
        {
          text: 'Logo',
          filterable: false,
          value: 'logo'
        },
        {
          text: 'Beneficiary',
          value: 'beneficiary'
        },
        {
          text: 'Amount',
          filterable: false,
          value: 'amount'
        }
      ],
      items: [
        {
          id: 'test-123',
          date: '1 Aug 2020',
          beneficiary: 'Coffee Shop',
          amount: '-$42.87',
          logo: 'https://seeklogo.com/images/C/coffee-shop-logo-D92C9F5E83-seeklogo.com.png',
          type: 'card payment',
          status: 'pending'
        },
        {
          id: 'test-456',
          date: '19 Oct 2020',
          beneficiary: 'Burger King',
          amount: '-$82.02',
          logo: 'https://logodownload.org/wp-content/uploads/2015/02/burger-king-logo-1-1.png',
          type: 'online transfer',
          status: 'pending'
        },
        {
          id: 'test-789',
          date: '7 Jun 2020',
          beneficiary: 'Starbucks',
          amount: '-$57.19',
          logo: 'https://pngset.com/images/starbucks-logo-starbucks-logo-starbucks-coffee-logo-symbol-trademark-badge-rug-transparent-png-2785606.png',
          type: 'transaction',
          status: 'pending'
        }
      ],
      searchTerm: null,
      selectedFilters: []
    }
  }
}
</script>

<style lang="scss" scoped>
.table-link {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--v-grey-lighten);

  & > * {
    padding: 8px 16px;
  }

  .status-section {
    padding: 0 4px !important;
    background-color: var(--v-grey-base);
  }

  &:hover {
    background-color: var(--v-grey-lighten);
  }
}

.border-top-removed {
  border-top: none;
}
</style>
