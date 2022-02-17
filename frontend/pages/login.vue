<template>
  <v-card>
    <v-card-text class="px-16 py-8">
      <h1 class="text-center mt-4 mb-12">
        Welcome
      </h1>

      <v-form
        ref="LoginForm"
        lazy-validation
        @submit.prevent="authenticate()"
      >
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          type="text"
          name="input-email"
          label="E-mail"
          placeholder="Enter your e-mail"
          lazy-validation
          autofocus
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

        <div class="pt-6 pb-8">
          <v-row
            v-if="errors.length"
          >
            <v-col
              v-if="errors.includes(401)"
              cols="12"
              class="text-center text-error pa-1"
            >
              Invalid credentials!
              You must use an already registered account.
            </v-col>

            <v-col
              v-else
              cols="12"
              class="text-center text-error pa-1"
            >
              An error occurred! Please check and try again.
            </v-col>
          </v-row>
        </div>

        <v-row class="my-2">
          <v-col
            cols="5"
            class="d-flex align-center justify-center pa-0"
          >
            <nuxt-link
              to="/register"
              class="app-link"
            >
              Don't have an account?
            </nuxt-link>
          </v-col>

          <v-col
            cols="7"
            class="text-center pa-0"
          >
            <v-btn
              type="submit"
              rounded
              raised
              x-large
              width="200"
              color="primary"
              class="text-transform-none"
              :loading="isButtonLoading"
              :disabled="!isLoginAllowed"
            >
              Log in
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',
  middleware: 'loggedOut',
  data () {
    return {
      email: null,
      password: null,
      errors: [],
      remember: false,
      isButtonLoading: false,
      showPassword: false,
      rules: {
        email: value => (!value || email(value)) ||
          'E-mail format is invalid',
        required: value => (!value || required(value)) ||
          'This field is required'
      }
    }
  },
  validations: {
    email: {
      isValid: value => email(value)
    },
    password: {
      isRequired: value => required(value)
    }
  },
  computed: {
    isLoginAllowed () {
      let flag = false

      if (this.$v.email.isValid &&
          this.$v.password.isRequired) {
        flag = true
      }

      return flag
    }
  },
  methods: {
    async authenticate () {
      if (!this.$refs.LoginForm.validate()) { return }

      this.isButtonLoading = true
      this.errors = []

      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password
        }
      }).then(() => {
        this.$router.replace('/')
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
