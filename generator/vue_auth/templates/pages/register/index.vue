<template>
  <div class="app d-flex flex-row align-items-center">
    <b-container>
      <Loading v-if="loading" />
      <b-row class="justify-content-center">
        <b-col md="8" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <%_ userSchema.attributes.forEach((r) => { _%>

                <b-form-group
                  id="<%= r.identifier.replace('_', '-') %>-fieldset"
                  label="<%= r.label %>"
                  label-for="<%= r.identifier.replace('_', '-') %>-input"
                  :horizontal="true"
                >
                  <b-form-input
                    id="<%= r.identifier.replace('_', '-') %>-input"
                    autocomplete="<%= r.identifier %>"
                    placeholder="<%= r.label %>"
                    v-model.trim="user.<%= r.identifier %>"
                  />
                </b-form-group>
                <%_ }) _%>

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
                    v-model.trim="user.password"
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
                    v-model.trim="user.passwordverify"
                    @keyup.enter="register(user)"
                  />
                </b-form-group>

                <button
                  block
                  variant="primary"
                  @click="register(user)"
                >
                  Create Account
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
const { mapGetters, mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'Register',
  metaInfo: {
    title: 'Register'
  },
  components: {
    Loading
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        passwordverify: ''
      }
    }
  },
  methods: mapActions(['register']),
  computed: mapGetters(['loading'])
}
</script>
