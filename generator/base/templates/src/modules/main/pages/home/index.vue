<template>
  <section class="home">
    <div class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <%= meta.label %>
          </h1>
          <h2 class="subtitle">
            <%= meta.description %>
          </h2>

          <a
            href="https://bulma.io"
            target="_blank"
          >
            <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="256" height="48">
          </a>

          <br>
          <br>

          <a
            class="button is-dark is-medium"
            href="https://codotype.org"
            target="_blank"
          >
            <i class="fa fa-fw fa-cog"></i>
            Generated with Codotype
          </a>

        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="content">

          <h1 class="title">Getting Started</h1>

          <b-field grouped group-multiline>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">vue</b-tag>
                <b-tag type="is-success">2.5.2</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">vue-router</b-tag>
                <b-tag type="is-success">3.0.1</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">vuex</b-tag>
                <b-tag type="is-success">3.0.0</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">bulma</b-tag>
                <b-tag type="is-primary">0.7.4</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">buefy</b-tag>
                <b-tag type="is-primary">0.6.1</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">font-awesome</b-tag>
                <b-tag type="is-info">5.3.1</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">webpack</b-tag>
                <b-tag type="is-info">3.8.1</b-tag>
              </b-taglist>
            </div>
          </b-field>

          <hr>

          <p class="is-size-4">This starter codebase was built with the following:</p>

          <ul>
            <li>
              <a href="https://vuejs.org/" target="_blank">Vue.js</a>
            </li>
            <li>
              <a href="https://router.vuejs.org" target="_blank">Vue Router</a>
            </li>
            <li>
              <a href="https://vuex.vuejs.org" target="_blank">Vuex</a>
            </li>
            <li>
              <a href="https://buefy.org/" target="_blank">Bulma</a>
            </li>
            <li>
              <a href="https://buefy.org/" target="_blank">Buefy</a>
            </li>
            <li>
              <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
import HomeFooter from './HomeFooter'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home'
  },
  components: {
    HomeFooter
  }
}
</script>
