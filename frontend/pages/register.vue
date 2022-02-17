<template>
  <v-card max-width="480" class="mx-auto">
    <v-card-text class="px-12 py-8">
      <h1 class="text-center mt-4 mb-12">
        Register
      </h1>

      <v-form
        ref="RegisterForm"
        lazy-validation
        @submit.prevent="register()"
      >
        <v-text-field
          v-model="name"
          :rules="[rules.required]"
          type="text"
          name="input-name"
          label="Name"
          placeholder="Enter your name"
          lazy-validation
          autofocus
          class="my-4"
        />

        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          type="text"
          name="input-email"
          label="E-mail"
          placeholder="Enter your e-mail"
          lazy-validation
          class="my-4"
        />

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          name="input-password"
          label="Password"
          placeholder="Enter your password"
          lazy-validation
          class="my-4"
          @click:append="showPassword = !showPassword"
        />

        <v-text-field
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="showConfirmPassword ? 'text' : 'password'"
          name="input-confirm-password"
          label="Confirm Password"
          placeholder="Confirm your password"
          lazy-validation
          class="my-4"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />

        <div class="py-6">
          <v-row
            v-if="errors.length"
          >
            <v-col
              cols="12"
              class="text-center text-error pa-1"
            >
              An error occurred! Please check and try again.
            </v-col>
          </v-row>
        </div>

        <v-row class="ma-1">
          <v-col
            cols="5"
            class="d-flex align-center justify-start pa-0"
          >
            <nuxt-link
              to="/login"
              class="app-link text-bold"
            >
              Already registered?
            </nuxt-link>
          </v-col>

          <v-col
            cols="7"
            class="text-right pa-0"
          >
            <v-btn
              type="submit"
              rounded
              raised
              x-large
              width="160"
              color="primary"
              :loading="isButtonLoading"
              :disabled="!isRegisterAllowed"
            >
              <span
                class="text-transform-none text-bold"
              >
                Submit
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { email, required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterPage',
  middleware: 'loggedOut',
  data () {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      errors: [],
      isButtonLoading: false,
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        email: value => (!value || email(value)) ||
          'E-mail format is invalid',
        required: value => (!value || required(value)) ||
          'This field is required'
      }
    }
  },
  validations: {
    name: {
      isRequired: value => required(value)
    },
    email: {
      isValid: value => required(value) && email(value)
    },
    password: {
      isRequired: value => required(value)
    },
    confirmPassword: {
      matched: sameAs('password')
    }
  },
  computed: {
    isRegisterAllowed () {
      let flag = false

      if (this.$v.name.isRequired &&
          this.$v.email.isValid &&
          this.$v.password.isRequired &&
          this.$v.confirmPassword.matched) {
        flag = true
      }

      return flag
    }
  },
  methods: {
    async register () {
      if (!this.$refs.RegisterForm.validate()) { return }

      this.isButtonLoading = true
      this.errors = []

      await this.$api.userRegister({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(async () => {
        await this.$toast.success('User registered successfully.')
        await this.$router.replace('/login')
      }).catch((error) => {
        if (error.response) {
          this.errors.push(error.response.status)
        } else {
          this.errors.push('unknown')
        }
      })

      this.isButtonLoading = false
    }
  }
}
</script>
