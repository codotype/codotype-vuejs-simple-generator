<template>
  <section class="home">
    <div class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <%= blueprint.label %>
          </h1>
          <h2 class="subtitle">
            A simple Vue.js CRUD frontend backed by localstorage.
            <br>
            Great for learning and prototyping - hack it!
          </h2>

          <a
            class="button is-light is-medium"
            href="https://alpha.codotype.io/generators/codotype-vuejs-simple-generator/build"
            target="_blank"
          >
            <img src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png" alt="Codotype Logo" style="margin-right: 0.5rem; height: 1.5rem; width: 1.5rem; float: left;">
            Generated with Codotype
          </a>

          <br>
          <br>

          <a
            href="https://bulma.io"
            target="_blank"
          >
            <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="256" height="48">
          </a>

          <br>
          <br>

          <b-field grouped group-multiline position="is-centered">
            <div class="control">
              <a href="https://vuejs.org/" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">vue</b-tag>
                  <b-tag type="is-success">2.5.2</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://router.vuejs.org" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">vue-router</b-tag>
                  <b-tag type="is-success">3.0.1</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://vuex.vuejs.org" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">vuex</b-tag>
                  <b-tag type="is-success">3.0.0</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://github.com/robinvdvleuten/vuex-persistedstate" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">vuex-persistedstate</b-tag>
                  <b-tag type="is-success">2.5.4</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://buefy.org/" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">buefy</b-tag>
                  <b-tag type="is-success">0.6.1</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://bulma.io/" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">bulma</b-tag>
                  <b-tag type="is-info">0.7.4</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://fontawesome.com/icons" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">font-awesome</b-tag>
                  <b-tag type="is-info">5.3.1</b-tag>
                </b-taglist>
              </a>
            </div>

            <div class="control">
              <a href="https://webpack.js.org/" target="_blank">
                <b-taglist attached>
                  <b-tag type="is-dark">webpack</b-tag>
                  <b-tag type="is-info">3.8.1</b-tag>
                </b-taglist>
              </a>
            </div>
          </b-field>

        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="content">

          <h1 class="title">Data Overview</h1>
          <p class="is-size-4">
            Here's some space to do something interesting with all that data you're collecting
            <i class="far fa-fw fa-lg fa-laugh" />
          </p>
          <p class="is-size-6">
            <i class="far fa-fw fa-lightbulb" />
            Check out the <router-link to="/settings">Settings</router-link> page to <b>Import</b>, <b>Export</b>, and <b>Flush</b> data.
          </p>

          <hr>

          <div class="columns is-multiline is-mobile">
            <%_ blueprint.schemas.forEach((schema, index) => { _%>
              <div class="column is-one-quarter">
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ <%= schema.identifier_plural %>.length }}</p>
                        <p class="subtitle"><%= schema.label_plural %></p>
                    </article>
                </div>
              </div>

            <%_ }) _%>
          </div>

        </div>
      </div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeFooter from './HomeFooter'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home'
  },
  components: {
    HomeFooter
  },
  computed: mapGetters({
  <%_ blueprint.schemas.forEach((schema, index) => { _%>
    <%= schema.identifier_plural %>: '<%= schema.identifier %>/collection/items',
  <%_ }) _%>
  })
}
</script>
