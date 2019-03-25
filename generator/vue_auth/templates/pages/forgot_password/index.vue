<template>
  <div class="app d-flex flex-row align-items-center">
    <b-container>

      <Loading v-if="loading" />

      <!-- TODO - abstract into a separate component, simplify -->
      <b-row v-else-if="done" class="justify-content-center">
        <b-col md="8" sm="8">
          <b-card class="mx-4 text-center">
            <p class="lead">An email has been sent to {{email}}</p>

            <small>
              Didn't get the email? Check your spam filter or <button size="sm" variant="link" @click="resetForm()" class="px-0">send another link</button>
            </small>
          </b-card>
        </b-col>
      </b-row>

      <b-row v-else class="justify-content-center">
        <b-col md="8" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Forgot Password</h1>
                <p class="text-muted">We'll email a magic link to you</p>

                <b-form-group
                  id="email-fieldset"
                  label="Email"
                  label-for="email-input"
                >
                  <b-form-input
                    id="email-input"
                    autocomplete="email"
                    placeholder="Email"
                    :value="email"
                    @input="setEmail"
                  />
                </b-form-group>

                <!-- TODO - better error handling -->
                <p v-if="error" class="error">Bad EMAIL information</p>

                <button
                  block
                  @click="submit()"
                  variant="outline-primary"
                >
                  Send Reset Email
                </button>

              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('auth/forgot_password/')

export default {
  name: 'ForgotPassword',
  metaInfo: {
    title: 'Forgot Password'
  },
  components: {
    Loading
  },
  computed: mapGetters(['loading', 'email', 'error', 'done' ]),
  methods: {
    ...mapActions(['submit', 'resetForm']),
    ...mapMutations({
      setEmail: 'email'
    })
  }
}
</script>
