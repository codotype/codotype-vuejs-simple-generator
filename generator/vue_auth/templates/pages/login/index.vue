<template>
  <div class="app d-flex flex-row align-items-center">
    <b-container>
      <Loading v-if="fetching" />
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>

                  <b-input-group class="mb-3">
                    <b-form-input
                      placeholder="Email"
                      autocomplete="email"
                      v-model="user.email"
                      @keyup.native.enter="login(user)"
                    />
                  </b-input-group>

                  <b-input-group class="mb-4">
                    <b-form-input
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="user.password"
                      @keyup.native.enter="login(user)"
                    />
                  </b-input-group>

                  <b-row>
                    <b-col cols="6">
                      <button variant="primary" class="px-4" @click="login(user)">Login</button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <button variant="link" to="/auth/forgot_password" class="px-0">Forgot password?</button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Register a new account to get started using all the great features of this web application</p>
                  <button to="/auth/register" variant="primary" class="active mt-3">Register Now!</button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  metaInfo: {
    title: 'Login'
  },
  components: {
    Loading
  },
  data () {
    return {
      user: {
        email: 'john@doe.com',
        password: 'abc123'
      }
    }
  },
  computed: mapGetters({
    fetching: 'auth/login/loading'
  }),
  methods: mapActions({
    login: 'auth/login/submit'
  })
}
</script>
