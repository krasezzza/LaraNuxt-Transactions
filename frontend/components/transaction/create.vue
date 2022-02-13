<template>
  <v-card>
    <v-card-title
      class="justify-center card-title py-2"
    >
      <v-icon color="var(--v-primary-lighten)">
        mdi-autorenew
      </v-icon>

      <v-spacer />

      <h5>
        Make a Transfer
      </h5>

      <v-spacer />

      <div />
    </v-card-title>

    <v-card-text class="px-6 pt-4">
      <v-text-field
        placeholder="Sender IBAN"
        persistent-placeholder
        class="mt-3"
      >
        <template #label>
          <h3>From Account</h3>
        </template>
      </v-text-field>

      <v-text-field
        placeholder="Receiver IBAN"
        persistent-placeholder
        :rules="[]"
        class="mt-3"
      >
        <template #label>
          <h3>To Account</h3>
        </template>
      </v-text-field>

      <v-text-field
        placeholder="$ 0.00"
        persistent-placeholder
        :rules="[]"
        class="mt-3"
      >
        <template #label>
          <h3>Amount</h3>
        </template>
      </v-text-field>
    </v-card-text>

    <v-card-actions class="px-6 pb-6">
      <v-spacer />
      <v-btn
        color="secondary"
        min-width="160"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TransactionCreate'
}
</script>
