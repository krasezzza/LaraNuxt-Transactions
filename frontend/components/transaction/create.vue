<template>
  <v-card>
    <v-card-title
      class="justify-center card-title py-2"
    >
      <v-icon color="var(--v-primary-lighten)">
        mdi-transfer
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
        v-model="senderName"
        placeholder="Sender Name"
        persistent-placeholder
        :rules="[]"
        class="mt-3"
      >
        <template #label>
          <h3>From Account</h3>
        </template>
      </v-text-field>

      <v-text-field
        v-model="receiverName"
        placeholder="Receiver Name"
        persistent-placeholder
        :rules="[]"
        class="mt-3"
      >
        <template #label>
          <h3>To Account</h3>
        </template>
      </v-text-field>

      <v-text-field
        v-model="amountValue"
        placeholder="$0.00"
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
        @click="sendTransaction()"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TransactionCreate',
  data () {
    return {
      senderName: null,
      receiverName: null,
      amountValue: null
    }
  },
  methods: {
    resetFields () {
      this.senderName = null
      this.receiverName = null
      this.amountValue = null
    },
    async sendTransaction () {
      await this.$api.createTransaction({
        sender: this.senderName,
        receiver: this.receiverName,
        amount: this.amountValue
      }).then((res) => {
        this.resetFields()
        this.$toast.success('Transaction created successfully.')
        this.$store.dispatch('transaction/updateRenderKeyList')

        return res.data
      }).catch(() => {
        this.$toast.error('Transaction could not be created!')

        return {}
      })
    }
  }
}
</script>
