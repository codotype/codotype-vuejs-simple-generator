<template>
  <div class="app d-flex flex-row align-items-center">
    <b-container>
      <Loading v-if="loading" />
      <b-row class="justify-content-center">
        <b-col md="8" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Reset Password</h1>
                <p class="text-muted">Reset your password below</p>

                <b-form-group
                  id="password-input"
                  label="Password"
                  label-for="password-input"
                  :horizontal="true"
                >
                  <b-form-input
                    type="password"
                    id="password-input"
                    autocomplete="new-password"
                    placeholder="Password"
                    :value="password"
                    @input="setPassword"
                  />
                </b-form-group>

                <b-form-group
                  label="Repeat Password"
                  label-for="password-verify-input"
                  :horizontal="true"
                >
                  <b-form-input
                    type="password"
                    id="password-verify-input"
                    autocomplete="new-password"
                    placeholder="Repeat password"
                    :value="password_verify"
                    @input="setPasswordVerify"
                  />
                </b-form-group>

                <p v-if="error" class="error">Bad EMAIL information</p>

                <button :disabled="verified" variant="outline-primary" block @click="resetPassword()">
                  Reset Password
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
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('auth/reset_password')

export default {
  name: 'Reset',
  metaInfo: {
    title: 'Reset Password'
  },
  components: {
    Loading
  },
  mounted () {
    const { token } = this.$route.query
    if (token) {
      this.$store.commit('auth/reset_password/password_reset_token', token )
    } else {
      this.$router.push('/auth/login')
    }
  },
  computed: mapGetters({
    loading: 'loading',
    password: 'password',
    password_verify: 'password_verify',
    error: 'error',
    verified: 'verified',
    done: 'done'
  }),
  methods: {
    ...mapActions({
      resetPassword: 'post',
      resetForm: 'resetForm'
    }),
    ...mapMutations({
      setPassword: 'password',
      setPasswordVerify: 'password_verify'
    })
  }
}
</script>
